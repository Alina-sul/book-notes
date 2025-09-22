use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::errors::{ApiError, ApiResult};
use crate::models::{Book, BookFilter, CreateBookRequest, UpdateBookRequest};
use crate::services::BookService;

pub async fn get_books(
    State(book_service): State<BookService>,
    Query(filter): Query<BookFilter>,
) -> ApiResult<impl IntoResponse> {
    let books = book_service.get_all_books(filter).await?;
    Ok(Json(books))
}

pub async fn get_book_by_id(
    State(book_service): State<BookService>,
    Path(id): Path<i32>,
) -> ApiResult<impl IntoResponse> {
    let book = book_service.get_book_by_id(id).await?;
    Ok(Json(book))
}

pub async fn create_book(
    State(book_service): State<BookService>,
    Json(request): Json<CreateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // Validate request
    request.validate().map_err(ApiError::ValidationError)?;

    let book = book_service.create_book(request).await?;
    Ok((StatusCode::CREATED, Json(book)))
}

pub async fn update_book(
    State(book_service): State<BookService>,
    Path(id): Path<i32>,
    Json(request): Json<UpdateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // Validate request
    request.validate().map_err(ApiError::ValidationError)?;

    let book = book_service.update_book(id, request).await?;
    Ok(Json(book))
}

pub async fn patch_book(
    State(book_service): State<BookService>,
    Path(id): Path<i32>,
    Json(request): Json<UpdateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // For PATCH, we can skip validation on empty fields
    if request.title.is_some() || request.author.is_some() || request.rating.is_some() {
        request.validate().map_err(ApiError::ValidationError)?;
    }

    let book = book_service.update_book(id, request).await?;
    Ok(Json(book))
}

pub async fn delete_book(
    State(book_service): State<BookService>,
    Path(id): Path<i32>,
) -> ApiResult<impl IntoResponse> {
    book_service.delete_book(id).await?;
    Ok(StatusCode::NO_CONTENT)
}