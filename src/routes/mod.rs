pub mod books;

use axum::Router;
use crate::services::AppState;

pub use books::create_book_routes;

/// Creates the main API router that combines all domain routers
pub fn create_api_routes() -> Router<AppState> {
    Router::new()
        .merge(books::create_book_routes())
        // Future routers can be added here:
        // .merge(notes::create_note_routes())
        // .merge(users::create_user_routes())
        // .merge(auth::create_auth_routes())
}