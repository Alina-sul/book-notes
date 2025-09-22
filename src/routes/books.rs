use axum::{
    routing::{delete, get, patch, post, put},
    Router,
};

use crate::handlers::books::{create_book, delete_book, get_book_by_id, get_books, patch_book, update_book};
use crate::services::AppState;

pub fn create_book_routes() -> Router<AppState> {
    Router::new()
        .route("/api/books", get(get_books).post(create_book))
        .route(
            "/api/books/:id",
            get(get_book_by_id)
                .put(update_book)
                .patch(patch_book)
                .delete(delete_book),
        )
}