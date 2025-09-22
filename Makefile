# Rust development commands

.PHONY: fmt check clippy fix test clean dev

# Format code
fmt:
	cargo fmt

# Check code without building
check:
	cargo check

# Run clippy for linting
clippy:
	cargo clippy --all-targets --all-features

# Run clippy with automatic fixes
fix:
	cargo clippy --fix --all-targets --all-features --allow-dirty

# Run tests
test:
	cargo test

# Clean build artifacts
clean:
	cargo clean

# Run development server
dev:
	cargo run

# Format, lint, and check everything
all: fmt clippy check test

# Pre-commit check (same as what runs on commit)
pre-commit:
	pre-commit run --all-files