import React from 'react';
import { Box, Typography } from '@mui/material';
import { BooksGridProps } from '../../types';
import BookItem from './BookItem';

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          viewMode="grid"
        />
      ))}
    </Box>
  );
};

export default BooksGrid;