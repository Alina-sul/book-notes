use sqlx::{postgres::PgPoolOptions, PgPool};
use std::time::Duration;
use tracing::{info, instrument};

use crate::config::Config;

/// Database connection configuration and setup
pub struct Database;

impl Database {
    /// Create a new database connection pool with production-ready settings
    #[instrument(name = "database_connection", skip(config))]
    pub async fn connect(config: &Config) -> Result<PgPool, sqlx::Error> {
        info!("Connecting to database...");

        let pool = PgPoolOptions::new()
            .max_connections(20) // Maximum number of connections in the pool
            .min_connections(5) // Minimum number of connections to maintain
            .acquire_timeout(Duration::from_secs(30)) // Timeout for acquiring a connection
            .idle_timeout(Duration::from_secs(600)) // Close connections idle for 10 minutes
            .max_lifetime(Duration::from_secs(1800)) // Close connections after 30 minutes
            .connect(&config.database_url)
            .await?;

        info!("Database connection pool established");

        // Run migrations in development/test environments
        if config.is_development() {
            info!("Running database migrations...");
            match sqlx::migrate!("./migrations").run(&pool).await {
                Ok(()) => info!("Database migrations completed successfully"),
                Err(e) => {
                    // Log migration errors but don't fail startup if tables already exist
                    if e.to_string().contains("already exists") {
                        info!("Database schema already up to date");
                    } else {
                        return Err(e.into());
                    }
                }
            }
        }

        Ok(pool)
    }

    /// Health check for the database connection
    #[instrument(name = "database_health_check", skip(pool))]
    pub async fn health_check(pool: &PgPool) -> Result<(), sqlx::Error> {
        sqlx::query("SELECT 1").execute(pool).await?;
        Ok(())
    }
}
