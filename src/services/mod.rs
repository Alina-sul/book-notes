pub mod book_service;

use sqlx::PgPool;

pub use book_service::BookService;

/// Application state that holds all services
#[derive(Clone)]
pub struct AppState {
    pub book_service: BookService,
    // Future services can be added here:
    // pub note_service: NoteService,
    // pub user_service: UserService,
    // pub auth_service: AuthService,
}

impl AppState {
    /// Create a new AppState with all services initialized
    pub fn new(pool: PgPool) -> Self {
        Self {
            book_service: BookService::new(pool.clone()),
            // Future services initialization:
            // note_service: NoteService::new(pool.clone()),
            // user_service: UserService::new(pool.clone()),
            // auth_service: AuthService::new(pool),
        }
    }
}
