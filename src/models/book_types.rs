use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

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

#[derive(Debug, Deserialize)]
pub struct CreateBookRequest {
    pub title: String,
    pub author: String,
    pub cover_url: Option<String>,
    pub tags: Option<Vec<String>>,
    pub status: Option<BookStatus>,
    pub rating: Option<i32>,
    pub description: Option<String>,
    pub date_finished: Option<NaiveDate>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateBookRequest {
    pub title: Option<String>,
    pub author: Option<String>,
    pub cover_url: Option<String>,
    pub tags: Option<Vec<String>>,
    pub status: Option<BookStatus>,
    pub rating: Option<i32>,
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