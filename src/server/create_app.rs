use axum::Router;
use tower_http::cors::CorsLayer;

use book_notes::{AppState, create_api_routes};

pub fn create_app(app_state: AppState) -> Router {
    // Create the main API router that combines all domain routers
    create_api_routes()
        .with_state(app_state)
        .layer(CorsLayer::permissive())
}