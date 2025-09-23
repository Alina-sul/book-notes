import React, { useState } from 'react';
import {
  Box,
  Paper,
  Chip
} from '@mui/material';
import { Book } from '../../types';
import BookCover from '../shared/BookCover';
import BookInfo from '../shared/BookInfo';
import ActionButtons from '../shared/ActionButtons';
import StatusChip from './StatusChip';

interface BookItemListProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookItemList: React.FC<BookItemListProps> = ({ book, onEdit, onDelete }) => {
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
        mb: 1,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
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
        position="top-right"
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <BookCover
          src={book.coverUrl}
          alt={book.title}
          variant="list"
        />

        <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <BookInfo
            title={book.title}
            author={book.author}
            notesCount={book.notesCount}
            variant="list"
          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          minWidth: 200,
          height: '100%',
          pt: 2
        }}>
          {/* Empty space for action buttons */}
          <Box sx={{ height: 32 }} />

          {/* Bottom section with tags and status */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            {/* Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'flex-end' }}>
              {book.tags.slice(0, 3).map((tag) => (
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

            {/* Status */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <StatusChip status={book.status} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BookItemList;