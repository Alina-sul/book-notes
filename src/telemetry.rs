use tracing::{subscriber::set_global_default, Subscriber};
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_log::LogTracer;
use tracing_subscriber::{fmt::MakeWriter, layer::SubscriberExt, EnvFilter, Registry};

use crate::config::{Config, Environment};

/// Initialize telemetry (logging and tracing) for the application
pub fn init_telemetry(config: &Config) -> Result<(), TelemetryError> {
    // Redirect all log events to tracing subscriber
    LogTracer::init().map_err(TelemetryError::LogTracer)?;

    let subscriber = get_subscriber(
        "book-notes".into(),
        config.log_level.clone(),
        std::io::stdout,
        &config.environment,
    );

    set_global_default(subscriber).map_err(TelemetryError::SetGlobalDefault)?;

    Ok(())
}

/// Create a tracing subscriber based on the environment
pub fn get_subscriber<Sink>(
    name: String,
    env_filter: String,
    sink: Sink,
    environment: &Environment,
) -> Box<dyn Subscriber + Send + Sync>
where
    Sink: for<'a> MakeWriter<'a> + Send + Sync + 'static,
{
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(env_filter));

    match environment {
        Environment::Development => {
            // Pretty, human-readable logs for development
            Box::new(
                Registry::default().with(env_filter).with(
                    tracing_subscriber::fmt::layer()
                        .with_writer(sink)
                        .with_file(true)
                        .with_line_number(true)
                        .with_thread_ids(true)
                        .with_target(false)
                        .compact(),
                ),
            )
        }
        Environment::Production | Environment::Test => {
            // Structured JSON logs for production
            Box::new(
                Registry::default()
                    .with(env_filter)
                    .with(JsonStorageLayer)
                    .with(BunyanFormattingLayer::new(name, sink)),
            )
        }
    }
}

#[derive(Debug, thiserror::Error)]
pub enum TelemetryError {
    #[error("Failed to set logger: {0}")]
    LogTracer(#[from] tracing_log::log_tracer::SetLoggerError),
    #[error("Failed to set global default subscriber: {0}")]
    SetGlobalDefault(#[from] tracing::subscriber::SetGlobalDefaultError),
}
