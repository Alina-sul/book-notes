// Declare the `routes` module. This tells the Rust compiler there is a file named `routes.rs`
// (or a folder `routes/` with a `mod.rs`) in the same directory.
// Anything declared `pub` inside `routes.rs` can be accessed via `routes::<item>`.
pub mod routes;

// Re-export the `routes` item from the `routes` module. This means that from outside this
// module, I can refer to `routes` directly at the current module level, rather than having
// to do `my_crate::my_module::routes::routes`. It shortens the access path and makes the
// `routes` function (or struct/constant) directly accessible wherever this module is in scope.
pub use routes::{routes};