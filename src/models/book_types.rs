use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::Validate;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub author: String,
    pub cover_url: Option<String>,
    pub tags: Vec<String>,
    pub status: BookStatus,
    pub date_added: NaiveDate,
    pub date_finished: Option<NaiveDate>,
    pub rating: Option<i32>,
    pub description: Option<String>,
    pub notes_count: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "book_status", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum BookStatus {
    Reading,
    Finished,
    Wishlist,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateBookRequest {
    #[validate(length(
        min = 1,
        max = 255,
        message = "Title must be between 1 and 255 characters"
    ))]
    pub title: String,

    #[validate(length(
        min = 1,
        max = 255,
        message = "Author must be between 1 and 255 characters"
    ))]
    pub author: String,

    #[validate(url(message = "Cover URL must be a valid URL"))]
    pub cover_url: Option<String>,

    #[validate(length(max = 20, message = "Maximum 20 tags allowed"))]
    pub tags: Option<Vec<String>>,

    pub status: Option<BookStatus>,

    #[validate(range(min = 1, max = 5, message = "Rating must be between 1 and 5"))]
    pub rating: Option<i32>,

    #[validate(length(max = 2000, message = "Description must be less than 2000 characters"))]
    pub description: Option<String>,

    pub date_finished: Option<NaiveDate>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct UpdateBookRequest {
    #[validate(length(
        min = 1,
        max = 255,
        message = "Title must be between 1 and 255 characters"
    ))]
    pub title: Option<String>,

    #[validate(length(
        min = 1,
        max = 255,
        message = "Author must be between 1 and 255 characters"
    ))]
    pub author: Option<String>,

    #[validate(url(message = "Cover URL must be a valid URL"))]
    pub cover_url: Option<String>,

    #[validate(length(max = 20, message = "Maximum 20 tags allowed"))]
    pub tags: Option<Vec<String>>,

    pub status: Option<BookStatus>,

    #[validate(range(min = 1, max = 5, message = "Rating must be between 1 and 5"))]
    pub rating: Option<i32>,

    #[validate(length(max = 2000, message = "Description must be less than 2000 characters"))]
    pub description: Option<String>,

    pub date_finished: Option<NaiveDate>,
}

#[derive(Debug, Deserialize)]
pub struct BookFilter {
    pub status: Option<BookStatus>,
    pub search: Option<String>,
    pub page: Option<u32>,
    pub limit: Option<u32>,
}
