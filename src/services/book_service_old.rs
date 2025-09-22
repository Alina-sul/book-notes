use chrono::{NaiveDate, Utc};
use sqlx::PgPool;

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
        let status = request.status.unwrap_or(BookStatus::Wishlist);
        let tags = request.tags.unwrap_or_default();
        let date_added = Utc::now().date_naive();

        let result = sqlx::query!(
            r#"
            INSERT INTO books (title, author, cover_url, tags, status, date_added, date_finished, rating, description, notes_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0)
            RETURNING id, title, author, cover_url, tags, status, date_added, date_finished, rating, description, notes_count
            "#,
            request.title.trim(),
            request.author.trim(),
            request.cover_url,
            &tags,
            status as BookStatus,
            date_added,
            request.date_finished,
            request.rating,
            request.description
        )
        .fetch_one(&self.pool)
        .await?;

        let book = Book {
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
            date_added: result.date_added,
            date_finished: result.date_finished,
            rating: result.rating,
            description: result.description,
            notes_count: result.notes_count,
        };

        Ok(book)
    }

    pub async fn get_book_by_id(&self, id: i32) -> ApiResult<Book> {
        let book = sqlx::query_as!(
            Book,
            r#"
            SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
            FROM books
            WHERE id = $1
            "#,
            id
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(book)
    }

    pub async fn get_all_books(&self, filter: BookFilter) -> ApiResult<Vec<Book>> {
        let limit = filter.limit.unwrap_or(50).min(100) as i64;
        let offset = (filter.page.unwrap_or(1) - 1) * limit as u32;

        let mut query = String::from(
            r#"
            SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
            FROM books
            WHERE 1=1
            "#
        );

        let mut params: Vec<Box<dyn sqlx::Encode<'_, sqlx::Postgres> + Send + Sync>> = Vec::new();
        let mut param_count = 0;

        if let Some(status) = &filter.status {
            param_count += 1;
            query.push_str(&format!(" AND status = ${}", param_count));
            params.push(Box::new(status.clone()));
        }

        if let Some(search) = &filter.search {
            if !search.trim().is_empty() {
                param_count += 1;
                query.push_str(&format!(" AND (title ILIKE ${} OR author ILIKE ${})", param_count, param_count));
                let search_pattern = format!("%{}%", search.trim());
                params.push(Box::new(search_pattern));
            }
        }

        query.push_str(" ORDER BY date_added DESC");

        param_count += 1;
        query.push_str(&format!(" LIMIT ${}", param_count));
        params.push(Box::new(limit));

        param_count += 1;
        query.push_str(&format!(" OFFSET ${}", param_count));
        params.push(Box::new(offset as i64));

        // For now, we'll use a simpler approach with individual conditions
        let books = match (&filter.status, &filter.search) {
            (Some(status), Some(search)) if !search.trim().is_empty() => {
                let search_pattern = format!("%{}%", search.trim());
                sqlx::query_as!(
                    Book,
                    r#"
                    SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
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
                sqlx::query_as!(
                    Book,
                    r#"
                    SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
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
                sqlx::query_as!(
                    Book,
                    r#"
                    SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
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
                sqlx::query_as!(
                    Book,
                    r#"
                    SELECT id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
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

        Ok(books)
    }

    pub async fn update_book(&self, id: i32, request: UpdateBookRequest) -> ApiResult<Book> {
        // First check if book exists
        self.get_book_by_id(id).await?;

        let updated_book = sqlx::query_as!(
            Book,
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
            RETURNING id, title, author, cover_url, tags, status as "status: BookStatus", date_added, date_finished, rating, description, notes_count
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

        Ok(updated_book)
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