import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import {
  StickyNote2 as NotesIcon
} from '@mui/icons-material';
import { formatNotesCount } from '../../utils/bookUtils';

interface BookInfoProps {
  title: string;
  author: string;
  notesCount: number;
  variant?: 'list' | 'grid';
  showNotesCount?: boolean;
}

const BookInfo: React.FC<BookInfoProps> = ({
  title,
  author,
  notesCount,
  variant = 'grid',
  showNotesCount = true
}) => {
  const getTitleStyles = () => {
    const baseStyles = {
      fontFamily: 'Literata',
      fontWeight: 500,
      mb: 0.5,
      overflow: 'hidden' as const,
    };

    if (variant === 'list') {
      return {
        ...baseStyles,
        fontSize: '1.1rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
        textAlign: 'left' as const,
      };
    }

    // Grid variant
    return {
      ...baseStyles,
      fontSize: '1rem',
      lineHeight: 1.3,
      display: '-webkit-box' as const,
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
    };
  };


  const getNotesStyles = () => {
    if (variant === 'list') {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mt: 1,
      };
    }

    // Grid variant - typically shown in bottom section
    return {
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    };
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h6"
        sx={getTitleStyles()}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: variant === 'list' ? 1 : 2,
          textAlign: variant === 'list' ? 'left' : 'center',
        }}
      >
        by {author}
      </Typography>

      {showNotesCount && (
        <Box sx={getNotesStyles()}>
          <NotesIcon sx={{ fontSize: 16, color: 'black' }} />
          <Typography variant="caption" sx={{ fontWeight: 500, color: 'black' }}>
            {variant === 'list' ? formatNotesCount(notesCount) : notesCount}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookInfo;