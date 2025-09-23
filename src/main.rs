mod config;
mod database;
mod server;
mod startup;
mod telemetry;

use startup::Application;
use tracing::error;

#[tokio::main]
async fn main() {
    // Build and run the application
    match run().await {
        Ok(()) => {}
        Err(e) => {
            // If telemetry isn't initialized yet, fall back to eprintln!
            if std::env::var("RUST_LOG").is_ok() {
                error!("Application failed to start: {:#}", e);
            } else {
                eprintln!("Application failed to start: {:#}", e);
            }
            std::process::exit(1);
        }
    }
}

async fn run() -> Result<(), Box<dyn std::error::Error>> {
    let application = Application::build().await?;
    application.run().await?;
    Ok(())
}
