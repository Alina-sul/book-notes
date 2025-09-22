import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip
} from '@mui/material';
import {
  StickyNote2 as NotesIcon
} from '@mui/icons-material';
import { Book } from '../../types/Book';
import StatusChip from './StatusChip';

interface BookItemProps {
  book: Book;
  viewMode: 'list' | 'grid';
}

const BookItem: React.FC<BookItemProps> = ({ book, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 1,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#000',
            backgroundColor: 'white',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Book Cover - Small */}
          <Box
            component="img"
            src={book.coverUrl}
            alt={book.title}
            sx={{
              width: 60,
              height: 90,
              objectFit: 'cover',
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />

          {/* Book Info - Left */}
          <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Literata',
                fontSize: '1.1rem',
                fontWeight: 500,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
              }}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, textAlign: 'left' }}
            >
              by {book.author}
            </Typography>
          </Box>

          {/* Tags and Info - Right */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, minWidth: 200 }}>
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

            {/* Notes count and Status */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {book.notesCount > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <NotesIcon sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="caption" color="text.secondary">
                    {book.notesCount}
                  </Typography>
                </Box>
              )}
              <StatusChip status={book.status} />
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  // Grid View
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#000',
          backgroundColor: 'white',
        },
      }}
    >
      {/* Book Cover - Larger */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box
          component="img"
          src={book.coverUrl}
          alt={book.title}
          sx={{
            width: 120,
            height: 180,
            objectFit: 'cover',
            borderRadius: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      </Box>

      {/* Book Info */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Literata',
            fontSize: '1rem',
            fontWeight: 500,
            mb: 0.5,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {book.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          by {book.author}
        </Typography>

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
            <NotesIcon sx={{ fontSize: 16, color: '#666' }} />
            <Typography variant="caption" color="text.secondary">
              {book.notesCount}
            </Typography>
          </Box>
          <StatusChip status={book.status} />
        </Box>
      </Box>
    </Paper>
  );
};

export default BookItem;