import React, { useState } from 'react';
import {
  Box,
  Paper,
  Chip,
  Typography
} from '@mui/material';
import {
  StickyNote2 as NotesIcon
} from '@mui/icons-material';
import { Book } from '../../types';
import BookCover from '../shared/BookCover';
import BookInfo from '../shared/BookInfo';
import ActionButtons from '../shared/ActionButtons';
import StatusChip from './StatusChip';

interface BookItemGridProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookItemGrid: React.FC<BookItemGridProps> = ({ book, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => onEdit(book);
  const handleDelete = () => onDelete(book.id);

  return (
    <Paper
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        '&:hover': {
          borderColor: '#000',
          backgroundColor: 'white',
        },
      }}
    >
      <ActionButtons
        onEdit={handleEdit}
        onDelete={handleDelete}
        visible={isHovered}
        position="spread"
      />

      {/* Book Cover */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <BookCover
          src={book.coverUrl}
          alt={book.title}
          variant="grid"
        />
      </Box>

      {/* Book Info */}
      <BookInfo
        title={book.title}
        author={book.author}
        notesCount={book.notesCount}
        variant="grid"
        showNotesCount={false} // We'll show it in the bottom section
      />

      {/* Tags */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2, justifyContent: 'center' }}>
        {book.tags.slice(0, 2).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 20,
              borderColor: '#ddd',
              color: '#666',
            }}
          />
        ))}
      </Box>

      {/* Bottom section */}
      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <NotesIcon sx={{ fontSize: 16, color: 'black' }} />
          <Typography variant="caption" sx={{ color: 'black', fontWeight: 500 }}>
            {book.notesCount}
          </Typography>
        </Box>
        <StatusChip status={book.status} />
      </Box>
    </Paper>
  );
};

export default BookItemGrid;