-- Create ENUM type for book status
CREATE TYPE book_status AS ENUM ('reading', 'finished', 'wishlist');

-- Add new columns to books table
ALTER TABLE books
    ADD COLUMN cover_url TEXT,
    ADD COLUMN tags TEXT[] DEFAULT '{}',
    ADD COLUMN status book_status DEFAULT 'wishlist',
    ADD COLUMN date_added DATE DEFAULT CURRENT_DATE,
    ADD COLUMN date_finished DATE,
    ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    ADD COLUMN description TEXT,
    ADD COLUMN notes_count INTEGER DEFAULT 0;

-- Add indexes for better query performance
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_date_added ON books(date_added);
CREATE INDEX idx_books_tags ON books USING GIN(tags);