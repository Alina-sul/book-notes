pub mod errors;
pub mod handlers;
pub mod models;
pub mod routes;
pub mod services;

pub use errors::*;
pub use models::*;
pub use routes::create_api_routes;
pub use services::{AppState, BookService};

// Re-export for external use
pub use handlers::books as handlers_books;