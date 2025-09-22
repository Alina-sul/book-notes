use axum::Router;
use tower_http::cors::CorsLayer;

use book_notes::{BookService, create_book_routes};

pub fn create_app(book_service: BookService) -> Router {
    // The actual API routes
    create_book_routes()
        .with_state(book_service)
        .layer(CorsLayer::permissive())
}