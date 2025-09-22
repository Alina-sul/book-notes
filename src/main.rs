use sqlx::PgPool;
use std::env;

mod server;
use server::create_app;

use book_notes::AppState;

#[tokio::main]
async fn main() {
    // load .env
    dotenvy::dotenv().ok();

    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL must be set in .env or env var");
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to create Postgres pool");

    // Create application state with all services
    let app_state = AppState::new(pool);

    // Build the app (router)
    let app = create_app(app_state);

    // Define the address/port
    let addr = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("Listening on http://127.0.0.1:8080");

    // Run the server
    axum::serve(addr, app).await.unwrap();
}
