use crate::models::book_types::{CreateBookRequest, UpdateBookRequest};

impl CreateBookRequest {
    pub fn validate(&self) -> Result<(), String> {
        if self.title.trim().is_empty() {
            return Err("Title cannot be empty".to_string());
        }
        if self.author.trim().is_empty() {
            return Err("Author cannot be empty".to_string());
        }
        if let Some(rating) = self.rating {
            if !(1..=5).contains(&rating) {
                return Err("Rating must be between 1 and 5".to_string());
            }
        }
        Ok(())
    }
}

impl UpdateBookRequest {
    pub fn validate(&self) -> Result<(), String> {
        if let Some(title) = &self.title {
            if title.trim().is_empty() {
                return Err("Title cannot be empty".to_string());
            }
        }
        if let Some(author) = &self.author {
            if author.trim().is_empty() {
                return Err("Author cannot be empty".to_string());
            }
        }
        if let Some(rating) = self.rating {
            if !(1..=5).contains(&rating) {
                return Err("Rating must be between 1 and 5".to_string());
            }
        }
        Ok(())
    }
}
