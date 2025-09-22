import React, { useState } from 'react';
import { booksApi, NewBook } from '../api/books';

interface BookFormProps {
  onBookCreated?: (id: number) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onBookCreated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError('Please fill in both title and author');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newBook: NewBook = { title: title.trim(), author: author.trim() };
      const response = await booksApi.createBook(newBook);

      setSuccess(`Book created successfully with ID: ${response.id}`);
      setTitle('');
      setAuthor('');

      if (onBookCreated) {
        onBookCreated(response.id);
      }
    } catch (err) {
      setError('Failed to create book. Please try again.');
      console.error('Error creating book:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isLoading}
            placeholder="Enter author name"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Add Book'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default BookForm;