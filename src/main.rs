use actix_web::{App, HttpServer};
use book_notes_api::{routes, init_pool};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize the database pool
    let pool = init_pool().await;

    // Start HTTP server
    HttpServer::new(move || {
        // Move a clone of `pool` into each App instance
        App::new()
            .app_data(pool.clone())
            .configure(|cfg| {
                cfg.service(routes());
            })
    })
        .bind(("127.0.0.1", 8080))?  // listen on port 8080
        .run()
        .await
}