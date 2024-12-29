use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Debug, Serialize, Deserialize)]
pub struct NewBook {
    pub title: String,
    pub author: String,
}

#[post("/books")]
pub async fn create_book(
    pool: web::Data<PgPool>,
    new_book: web::Json<NewBook>,
) -> impl Responder {
    // Insert into DB
    let result = sqlx::query!(
        r#"
        INSERT INTO books (title, author)
        VALUES ($1, $2)
        RETURNING id
        "#,
        new_book.title,
        new_book.author
    )
        .fetch_one(pool.get_ref())
        .await;

    match result {
        Ok(record) => HttpResponse::Ok().json(format!("Book added with id: {}", record.id)),
        Err(e) => {
            eprintln!("Error inserting book: {:?}", e);
            HttpResponse::InternalServerError().body("Could not insert book")
        }
    }
}