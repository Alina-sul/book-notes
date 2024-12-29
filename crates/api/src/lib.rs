pub mod books;

use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(
        crate::books::create_book
    ),
    components(
        schemas(books::NewBook)
    ),
)]
pub struct ApiDoc;
