import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Fade
} from '@mui/material';
import {
  StickyNote2 as NotesIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { BookItemProps } from '../../types';
import { formatNotesCount } from '../../utils/bookUtils';
import StatusChip from './StatusChip';

const BookItem: React.FC<BookItemProps> = ({ book, viewMode, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  if (viewMode === 'list') {
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
        {/* Action buttons - List view */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 0.5,
              zIndex: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(book);
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book.id);
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: '#ffebee',
                  color: '#d32f2f',
                },
              }}
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Fade>

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

            {/* Notes count - visible in left section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <NotesIcon sx={{ fontSize: 16, color: 'black' }} />
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'black' }}>
                {formatNotesCount(book.notesCount)}
              </Typography>
            </Box>
          </Box>

          {/* Tags and Info - Right */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: 200, height: '100%', pt: 2 }}>
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
  }

  // Grid View
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
      {/* Action buttons - Grid view */}
      <Fade in={isHovered}>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(book);
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book.id);
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: '#ffebee',
                color: '#d32f2f',
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Fade>

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
            <NotesIcon sx={{ fontSize: 16, color: 'black' }} />
            <Typography variant="caption" sx={{ color: 'black', fontWeight: 500 }}>
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