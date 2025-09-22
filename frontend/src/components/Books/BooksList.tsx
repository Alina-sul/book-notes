import React from 'react';
import { Box, Typography } from '@mui/material';
import { Book } from '../../types/Book';
import BookItem from './BookItem';

interface BooksListProps {
  books: Book[];
}

const BooksList: React.FC<BooksListProps> = ({ books }) => {
  if (books.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'Literata' }}>
          No books found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search or filters
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          viewMode="list"
        />
      ))}
    </Box>
  );
};

export default BooksList;