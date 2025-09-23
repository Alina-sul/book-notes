pub mod book_types;

// Re-export all book-related types and traits
pub use book_types::*;

// Re-export validator trait for validation
pub use validator::Validate;
