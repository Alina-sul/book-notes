import React from 'react';
import {
  Box,
  IconButton,
  Fade
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  visible: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'spread';
  size?: 'small' | 'medium';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  visible,
  position = 'top-right',
  size = 'small'
}) => {
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      display: 'flex',
      zIndex: 1,
    };

    switch (position) {
      case 'top-left':
        return {
          ...baseStyles,
          top: 8,
          left: 8,
          gap: 0.5,
        };
      case 'top-right':
        return {
          ...baseStyles,
          top: 8,
          right: 8,
          gap: 0.5,
        };
      case 'bottom-right':
        return {
          ...baseStyles,
          bottom: 8,
          right: 8,
          gap: 0.5,
        };
      case 'bottom-left':
        return {
          ...baseStyles,
          bottom: 8,
          left: 8,
          gap: 0.5,
        };
      case 'spread':
        return {
          ...baseStyles,
          top: 8,
          left: 8,
          right: 8,
          justifyContent: 'space-between',
        };
      default:
        return {
          ...baseStyles,
          top: 8,
          right: 8,
          gap: 0.5,
        };
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Fade in={visible}>
      <Box sx={getPositionStyles()}>
        <IconButton
          size={size}
          onClick={handleEditClick}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: size === 'small' ? 32 : 40,
            height: size === 'small' ? 32 : 40,
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <EditIcon sx={{ fontSize: size === 'small' ? 16 : 20 }} />
        </IconButton>

        <IconButton
          size={size}
          onClick={handleDeleteClick}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: size === 'small' ? 32 : 40,
            height: size === 'small' ? 32 : 40,
            '&:hover': {
              backgroundColor: '#ffebee',
              color: '#d32f2f',
            },
          }}
        >
          <DeleteIcon sx={{ fontSize: size === 'small' ? 16 : 20 }} />
        </IconButton>
      </Box>
    </Fade>
  );
};

export default ActionButtons;