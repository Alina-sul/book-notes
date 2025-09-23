import React from 'react';
import { Box } from '@mui/material';

interface BookCoverProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'list' | 'grid';
}

const BookCover: React.FC<BookCoverProps> = ({
  src,
  alt,
  size = 'medium',
  variant = 'grid'
}) => {
  const getSizeStyles = () => {
    if (variant === 'list') {
      return {
        width: 60,
        height: 90,
      };
    }

    // Grid variant
    switch (size) {
      case 'small':
        return {
          width: 80,
          height: 120,
        };
      case 'medium':
        return {
          width: 120,
          height: 180,
        };
      case 'large':
        return {
          width: 160,
          height: 240,
        };
      default:
        return {
          width: 120,
          height: 180,
        };
    }
  };

  const getShadow = () => {
    return variant === 'list'
      ? '0 2px 8px rgba(0,0,0,0.1)'
      : '0 4px 12px rgba(0,0,0,0.15)';
  };

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        ...getSizeStyles(),
        objectFit: 'cover',
        borderRadius: 1,
        boxShadow: getShadow(),
      }}
    />
  );
};

export default BookCover;