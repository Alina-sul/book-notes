use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::errors::{ApiError, ApiResult};
use crate::models::{BookFilter, CreateBookRequest, UpdateBookRequest};
use crate::services::AppState;

pub async fn get_books(
    State(app_state): State<AppState>,
    Query(filter): Query<BookFilter>,
) -> ApiResult<impl IntoResponse> {
    let books = app_state.book_service.get_all_books(filter).await?;
    Ok(Json(books))
}

pub async fn get_book_by_id(
    State(app_state): State<AppState>,
    Path(id): Path<i32>,
) -> ApiResult<impl IntoResponse> {
    let book = app_state.book_service.get_book_by_id(id).await?;
    Ok(Json(book))
}

pub async fn create_book(
    State(app_state): State<AppState>,
    Json(request): Json<CreateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // Validate request
    request.validate().map_err(ApiError::ValidationError)?;

    let book = app_state.book_service.create_book(request).await?;
    Ok((StatusCode::CREATED, Json(book)))
}

pub async fn update_book(
    State(app_state): State<AppState>,
    Path(id): Path<i32>,
    Json(request): Json<UpdateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // Validate request
    request.validate().map_err(ApiError::ValidationError)?;

    let book = app_state.book_service.update_book(id, request).await?;
    Ok(Json(book))
}

pub async fn patch_book(
    State(app_state): State<AppState>,
    Path(id): Path<i32>,
    Json(request): Json<UpdateBookRequest>,
) -> ApiResult<impl IntoResponse> {
    // For PATCH, we can skip validation on empty fields
    if request.title.is_some() || request.author.is_some() || request.rating.is_some() {
        request.validate().map_err(ApiError::ValidationError)?;
    }

    let book = app_state.book_service.update_book(id, request).await?;
    Ok(Json(book))
}

pub async fn delete_book(
    State(app_state): State<AppState>,
    Path(id): Path<i32>,
) -> ApiResult<impl IntoResponse> {
    app_state.book_service.delete_book(id).await?;
    Ok(StatusCode::NO_CONTENT)
}