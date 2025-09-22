use axum::Router;
use tower_http::cors::CorsLayer;

use book_notes::{BookService, create_api_routes};

pub fn create_app(book_service: BookService) -> Router {
    // Create the main API router that combines all domain routers
    create_api_routes()
        .with_state(book_service)
        .layer(CorsLayer::permissive())
}