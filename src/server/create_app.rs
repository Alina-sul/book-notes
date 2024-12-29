use axum::{
    routing::post,
    Router,
};
use sqlx::PgPool;
use utoipa_swagger_ui::SwaggerUi;
use book_notes_api::ApiDoc;
use book_notes_api::books;
use utoipa::OpenApi;

pub fn create_app(pool: PgPool) -> Router {
    // The actual API routes
    let api_router = Router::new()
        .route("/books/create", post(books::create_book))
        .with_state(pool);

    // A router providing Swagger UI at `/swagger-ui`
    let swagger_router = SwaggerUi::new("/swagger-ui")
        .url("/api-docs/openapi.json", ApiDoc::openapi());

    // Merge the two routers:
    api_router
        .merge(swagger_router)
}