pub mod books;
pub mod notes;

use axum::{routing::post, Router};
use sqlx::{Pool, Postgres};
use sqlx::PgPool;
use std::env;

pub async fn init_pool() -> PgPool {
    dotenvy::dotenv().ok(); // Load .env if present

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in .env");

    PgPool::connect(&database_url)
        .await
        .expect("Failed to create Postgres pool")
}

// .
pub fn create_app(pool: Pool<Postgres>) -> Router {
    Router::new()
        .route("/books", post(books::create_book))
        // Add other routes here
        .with_state(pool)
}