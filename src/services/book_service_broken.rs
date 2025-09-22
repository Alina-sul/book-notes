use chrono::Utc;
use sqlx::{PgPool, Row};

use crate::errors::ApiResult;
use crate::models::{Book, BookFilter, BookStatus, CreateBookRequest, UpdateBookRequest};

// Helper to convert database row to Book
fn row_to_book(row: &sqlx::postgres::PgRow) -> Book {
    Book {
        id: row.get("id"),
        title: row.get("title"),
        author: row.get("author"),
        cover_url: row.get("cover_url"),
        tags: row.get::<Option<Vec<String>>, _>("tags").unwrap_or_default(),
        status: match row.get::<Option<String>, _>("status").as_deref() {
            Some("reading") => BookStatus::Reading,
            Some("finished") => BookStatus::Finished,
            Some("wishlist") => BookStatus::Wishlist,
            _ => BookStatus::Wishlist,
        },
        date_added: row.get::<Option<chrono::NaiveDate>, _>("date_added").unwrap_or_else(|| Utc::now().date_naive()),
        date_finished: row.get("date_finished"),
        rating: row.get("rating"),
        description: row.get("description"),
        notes_count: row.get::<Option<i32>, _>("notes_count").unwrap_or(0),
    }
}

#[derive(Clone)]
pub struct BookService {
    pool: PgPool,
}

impl BookService {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn create_book(&self, request: CreateBookRequest) -> ApiResult<Book> {
        let status = request.status.unwrap_or(BookStatus::Wishlist);
        let tags = request.tags.unwrap_or_default();
        let date_added = Utc::now().date_naive();

        let row = sqlx::query(
            r#"
            INSERT INTO books (title, author, cover_url, tags, status, date_added, date_finished, rating, description, notes_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0)
            RETURNING id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
            "#,
        )
        .bind(request.title.trim())
        .bind(request.author.trim())
        .bind(request.cover_url)
        .bind(&tags)
        .bind(status as BookStatus)
        .bind(date_added)
        .bind(request.date_finished)
        .bind(request.rating)
        .bind(request.description)
        .fetch_one(&self.pool)
        .await?;

        Ok(row_to_book(&row))
    }

    pub async fn get_book_by_id(&self, id: i32) -> ApiResult<Book> {
        let row = sqlx::query(
            r#"
            SELECT id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
            FROM books
            WHERE id = $1
            "#,
        )
        .bind(id)
        .fetch_one(&self.pool)
        .await?;

        Ok(row_to_book(&row))
    }

    pub async fn get_all_books(&self, filter: BookFilter) -> ApiResult<Vec<Book>> {
        let limit = filter.limit.unwrap_or(50).min(100) as i64;
        let offset = (filter.page.unwrap_or(1) - 1) * limit as u32;

        let results = match (&filter.status, &filter.search) {
            (Some(status), Some(search)) if !search.trim().is_empty() => {
                let search_pattern = format!("%{}%", search.trim());
                sqlx::query!(
                    r#"
                    SELECT id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
                    FROM books
                    WHERE status = $1 AND (title ILIKE $2 OR author ILIKE $2)
                    ORDER BY date_added DESC
                    LIMIT $3 OFFSET $4
                    "#,
                    status.clone() as BookStatus,
                    search_pattern,
                    limit,
                    offset as i64
                )
                .fetch_all(&self.pool)
                .await?
            }
            (Some(status), _) => {
                sqlx::query!(
                    r#"
                    SELECT id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
                    FROM books
                    WHERE status = $1
                    ORDER BY date_added DESC
                    LIMIT $2 OFFSET $3
                    "#,
                    status.clone() as BookStatus,
                    limit,
                    offset as i64
                )
                .fetch_all(&self.pool)
                .await?
            }
            (None, Some(search)) if !search.trim().is_empty() => {
                let search_pattern = format!("%{}%", search.trim());
                sqlx::query!(
                    r#"
                    SELECT id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
                    FROM books
                    WHERE title ILIKE $1 OR author ILIKE $1
                    ORDER BY date_added DESC
                    LIMIT $2 OFFSET $3
                    "#,
                    search_pattern,
                    limit,
                    offset as i64
                )
                .fetch_all(&self.pool)
                .await?
            }
            _ => {
                sqlx::query!(
                    r#"
                    SELECT id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
                    FROM books
                    ORDER BY date_added DESC
                    LIMIT $1 OFFSET $2
                    "#,
                    limit,
                    offset as i64
                )
                .fetch_all(&self.pool)
                .await?
            }
        };

        let books: Vec<Book> = results
            .into_iter()
            .map(|result| Book {
                id: result.id,
                title: result.title,
                author: result.author,
                cover_url: result.cover_url,
                tags: result.tags.unwrap_or_default(),
                status: match result.status.as_str() {
                    "reading" => BookStatus::Reading,
                    "finished" => BookStatus::Finished,
                    "wishlist" => BookStatus::Wishlist,
                    _ => BookStatus::Wishlist,
                },
                date_added: result.date_added.unwrap_or_else(|| Utc::now().date_naive()),
                date_finished: result.date_finished,
                rating: result.rating,
                description: result.description,
                notes_count: result.notes_count.unwrap_or(0),
            })
            .collect();

        Ok(books)
    }

    pub async fn update_book(&self, id: i32, request: UpdateBookRequest) -> ApiResult<Book> {
        // First check if book exists
        self.get_book_by_id(id).await?;

        let result = sqlx::query!(
            r#"
            UPDATE books
            SET
                title = COALESCE($2, title),
                author = COALESCE($3, author),
                cover_url = COALESCE($4, cover_url),
                tags = COALESCE($5, tags),
                status = COALESCE($6, status),
                rating = COALESCE($7, rating),
                description = COALESCE($8, description),
                date_finished = COALESCE($9, date_finished)
            WHERE id = $1
            RETURNING id, title, author, cover_url, tags, status::text as status, date_added, date_finished, rating, description, notes_count
            "#,
            id,
            request.title,
            request.author,
            request.cover_url,
            request.tags.as_deref(),
            request.status as Option<BookStatus>,
            request.rating,
            request.description,
            request.date_finished
        )
        .fetch_one(&self.pool)
        .await?;

        let book = Book {
            id: result.id,
            title: result.title,
            author: result.author,
            cover_url: result.cover_url,
            tags: result.tags.unwrap_or_default(),
            status: match result.status.as_deref() {
                Some("reading") => BookStatus::Reading,
                Some("finished") => BookStatus::Finished,
                Some("wishlist") => BookStatus::Wishlist,
                _ => BookStatus::Wishlist,
            },
            date_added: result.date_added.unwrap_or_else(|| Utc::now().date_naive()),
            date_finished: result.date_finished,
            rating: result.rating,
            description: result.description,
            notes_count: result.notes_count.unwrap_or(0),
        };

        Ok(book)
    }

    pub async fn delete_book(&self, id: i32) -> ApiResult<()> {
        let result = sqlx::query!("DELETE FROM books WHERE id = $1", id)
            .execute(&self.pool)
            .await?;

        if result.rows_affected() == 0 {
            return Err(crate::errors::ApiError::NotFound(format!(
                "Book with id {} not found",
                id
            )));
        }

        Ok(())
    }
}