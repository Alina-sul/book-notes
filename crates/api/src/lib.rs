pub mod books;
pub mod notes;

use actix_web::{web, Scope};
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

pub fn routes() -> Scope {
    web::scope("")
        .service(books::create_book)
    // .service(notes::create_note) // etc. for notes
}