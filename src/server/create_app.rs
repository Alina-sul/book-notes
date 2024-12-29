use axum::{
    routing::post,
    Router,
};
use sqlx::PgPool;

use book_notes_api::books;
pub fn create_app(pool: PgPool) -> Router {
    Router::new()
        // POST /books goes to create_book
        .route("/books", post(books::create_book))
        // You can add more routes here...
        .with_state(pool)
}