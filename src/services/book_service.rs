use chrono::Utc;
use sqlx::{PgPool, Row};
use validator::Validate;

use crate::errors::ApiResult;
use crate::models::{Book, BookFilter, BookStatus, CreateBookRequest, UpdateBookRequest};

#[derive(Clone)]
pub struct BookService {
    pool: PgPool,
}

impl BookService {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn create_book(&self, request: CreateBookRequest) -> ApiResult<Book> {
        // Validate the request using the validator crate
        request.validate()?;

        let status = request.status.unwrap_or(BookStatus::Wishlist);
        let tags = request.tags.unwrap_or_default();
        let date_added = Utc::now().date_naive();

        let row = sqlx::query(
            r#"
            INSERT INTO books (title, author, cover_url, tags, status, date_added, date_finished, rating, description, notes_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0)
            RETURNING id, title, author, cover_url, tags, status::text, date_added, date_finished, rating, description, notes_count
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

        Ok(self.row_to_book(&row))
    }

    pub async fn get_book_by_id(&self, id: i32) -> ApiResult<Book> {
        let row = sqlx::query(
            r#"
            SELECT id, title, author, cover_url, tags, status::text, date_added, date_finished, rating, description, notes_count
            FROM books
            WHERE id = $1
            "#,
        )
        .bind(id)
        .fetch_one(&self.pool)
        .await?;

        Ok(self.row_to_book(&row))
    }

    pub async fn get_all_books(&self, filter: BookFilter) -> ApiResult<Vec<Book>> {
        let limit = filter.limit.unwrap_or(50).min(100) as i64;
        let offset = (filter.page.unwrap_or(1) - 1) * limit as u32;

        let mut query = String::from(
            "SELECT id, title, author, cover_url, tags, status::text, date_added, date_finished, rating, description, notes_count FROM books WHERE 1=1"
        );
        let mut conditions = Vec::new();

        if let Some(status) = &filter.status {
            conditions.push(format!(
                " AND status = '{}'",
                match status {
                    BookStatus::Reading => "reading",
                    BookStatus::Finished => "finished",
                    BookStatus::Wishlist => "wishlist",
                }
            ));
        }

        if let Some(search) = &filter.search {
            if !search.trim().is_empty() {
                conditions.push(format!(
                    " AND (title ILIKE '%{}%' OR author ILIKE '%{}%')",
                    search, search
                ));
            }
        }

        for condition in conditions {
            query.push_str(&condition);
        }

        query.push_str(&format!(
            " ORDER BY date_added DESC LIMIT {} OFFSET {}",
            limit, offset
        ));

        let rows = sqlx::query(&query).fetch_all(&self.pool).await?;
        let books: Vec<Book> = rows.iter().map(|row| self.row_to_book(row)).collect();
        Ok(books)
    }

    pub async fn update_book(&self, id: i32, request: UpdateBookRequest) -> ApiResult<Book> {
        // Validate the request using the validator crate
        request.validate()?;

        // First check if book exists
        self.get_book_by_id(id).await?;

        let row = sqlx::query(
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
            RETURNING id, title, author, cover_url, tags, status::text, date_added, date_finished, rating, description, notes_count
            "#,
        )
        .bind(id)
        .bind(request.title)
        .bind(request.author)
        .bind(request.cover_url)
        .bind(request.tags.as_deref())
        .bind(request.status.map(|s| s as BookStatus))
        .bind(request.rating)
        .bind(request.description)
        .bind(request.date_finished)
        .fetch_one(&self.pool)
        .await?;

        Ok(self.row_to_book(&row))
    }

    pub async fn delete_book(&self, id: i32) -> ApiResult<()> {
        let result = sqlx::query("DELETE FROM books WHERE id = $1")
            .bind(id)
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

    fn row_to_book(&self, row: &sqlx::postgres::PgRow) -> Book {
        Book {
            id: row.get("id"),
            title: row.get("title"),
            author: row.get("author"),
            cover_url: row.get("cover_url"),
            tags: row
                .get::<Option<Vec<String>>, _>("tags")
                .unwrap_or_default(),
            status: match row.get::<Option<String>, _>("status").as_deref() {
                Some("reading") => BookStatus::Reading,
                Some("finished") => BookStatus::Finished,
                Some("wishlist") => BookStatus::Wishlist,
                _ => BookStatus::Wishlist,
            },
            date_added: row
                .get::<Option<chrono::NaiveDate>, _>("date_added")
                .unwrap_or_else(|| Utc::now().date_naive()),
            date_finished: row.get("date_finished"),
            rating: row.get("rating"),
            description: row.get("description"),
            notes_count: row.get::<Option<i32>, _>("notes_count").unwrap_or(0),
        }
    }
}
