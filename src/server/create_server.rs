use axum::{routing::post, Router};
use book_notes_api::books;
use book_notes_api::ApiDoc;
use sqlx::PgPool;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

pub fn create_server(pool: PgPool) -> Router {
    // The actual API routes
    let api_router =
        Router::new().route("/books/create", post(books::create_book)).with_state(pool);

    // A router providing Swagger UI at `/swagger-ui`
    let swagger_router =
        SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi());

    // Merge the two routers:
    Router::new().nest("/api", api_router).merge(swagger_router)
}
