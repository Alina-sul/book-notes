use std::net::SocketAddr;
use tokio::signal;
use tracing::{info, instrument};

use crate::{
    config::Config,
    database::Database,
    server::create_app,
    telemetry::{init_telemetry, TelemetryError},
};
use book_notes::AppState;

/// Application startup and lifecycle management
pub struct Application {
    config: Config,
    socket_addr: SocketAddr,
    app_state: AppState,
}

impl Application {
    /// Build the application with all dependencies
    #[instrument(name = "application_build")]
    pub async fn build() -> Result<Self, ApplicationError> {
        // Load configuration
        let config = Config::from_env().map_err(ApplicationError::Config)?;

        // Initialize telemetry
        init_telemetry(&config).map_err(ApplicationError::Telemetry)?;

        info!("Starting application in {:?} mode", config.environment);

        // Connect to database
        let pool = Database::connect(&config)
            .await
            .map_err(ApplicationError::Database)?;

        // Verify database health
        Database::health_check(&pool)
            .await
            .map_err(ApplicationError::DatabaseHealth)?;

        // Create application state
        let app_state = AppState::new(pool);

        // Parse the socket address
        let socket_addr: SocketAddr = config
            .server_address()
            .parse()
            .map_err(|_| ApplicationError::InvalidSocketAddress)?;

        info!("Server will bind to {}", socket_addr);

        Ok(Self {
            config,
            socket_addr,
            app_state,
        })
    }

    /// Get the socket address the server will bind to
    pub fn socket_addr(&self) -> SocketAddr {
        self.socket_addr
    }

    /// Run the application until shutdown signal is received
    #[instrument(name = "application_run", skip(self))]
    pub async fn run(self) -> Result<(), ApplicationError> {
        let app = create_app(self.app_state);

        info!("Application started successfully");

        // Bind to the socket address using tokio listener directly
        let listener = tokio::net::TcpListener::bind(self.socket_addr)
            .await
            .map_err(ApplicationError::ServerBinding)?;

        info!("Server listening on {}", self.socket_addr);

        // Run server with graceful shutdown
        axum::serve(listener, app)
            .with_graceful_shutdown(shutdown_signal())
            .await
            .map_err(ApplicationError::Server)?;

        info!("Application shut down gracefully");
        Ok(())
    }

    /// Run the application in the background (useful for testing)
    pub async fn run_until_stopped(self) -> Result<(), ApplicationError> {
        let app = create_app(self.app_state);

        let listener = tokio::net::TcpListener::bind(self.socket_addr)
            .await
            .map_err(ApplicationError::ServerBinding)?;

        axum::serve(listener, app)
            .await
            .map_err(ApplicationError::Server)?;

        Ok(())
    }
}

/// Wait for shutdown signal (Ctrl+C or SIGTERM)
async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            info!("Received Ctrl+C signal");
        },
        _ = terminate => {
            info!("Received SIGTERM signal");
        },
    }

    info!("Shutdown signal received, starting graceful shutdown");
}

#[derive(Debug, thiserror::Error)]
pub enum ApplicationError {
    #[error("Configuration error: {0}")]
    Config(#[from] crate::config::ConfigError),
    #[error("Telemetry initialization error: {0}")]
    Telemetry(#[from] TelemetryError),
    #[error("Database connection error: {0}")]
    Database(#[from] sqlx::Error),
    #[error("Database health check failed: {0}")]
    DatabaseHealth(sqlx::Error),
    #[error("Server binding error: {0}")]
    ServerBinding(std::io::Error),
    #[error("Invalid socket address")]
    InvalidSocketAddress,
    #[error("Server runtime error: {0}")]
    Server(std::io::Error),
}
