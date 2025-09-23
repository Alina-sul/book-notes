import React from 'react';
import { BookItemProps } from '../../types';
import BookItemList from './BookItemList';
import BookItemGrid from './BookItemGrid';

const BookItem: React.FC<BookItemProps> = ({ book, viewMode, onEdit, onDelete }) => {
  if (viewMode === 'list') {
    return (
      <BookItemList
        book={book}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return (
    <BookItemGrid
      book={book}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default BookItem;