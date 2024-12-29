use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{Pool, Postgres};
use utoipa;
use utoipa::ToSchema;

/// This is the JSON body we expect for creating a new book
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct NewBook {
    pub title: String,
    pub author: String,
}

#[utoipa::path(post, path = "/api/books/create", request_body = NewBook, // Specifies the expected JSON body,
    responses((status = 201, description = "Book created successfully", body = String),(status = 500, description = "Could not insert book")
    ))]
pub async fn create_book(
    State(pool): State<Pool<Postgres>>,
    Json(new_book): Json<NewBook>,
) -> impl IntoResponse {
    // Insert into DB
    let result = sqlx::query!(
        r#"INSERT INTO books (title, author) VALUES ($1, $2) RETURNING id"#,
        new_book.title,
        new_book.author
    )
    .fetch_one(&pool)
    .await;

    match result {
        Ok(record) => {
            // Return 201 Created and the new book's ID in JSON
            (StatusCode::CREATED, Json(json!({ "id": record.id })))
        }
        Err(e) => {
            eprintln!("Error inserting book: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Could not insert book" })))
        }
    }
}
