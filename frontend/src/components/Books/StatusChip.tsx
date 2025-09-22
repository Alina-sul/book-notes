import React from 'react';
import { Chip } from '@mui/material';
import { BookStatus } from '../../types/Book';

interface StatusChipProps {
  status: BookStatus;
  size?: 'small' | 'medium';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const getStatusConfig = (status: BookStatus) => {
    switch (status) {
      case 'reading':
        return {
          label: 'Currently Reading',
          color: '#E3F2FD', // Light blue
          textColor: '#1565C0',
        };
      case 'finished':
        return {
          label: 'Finished',
          color: '#E8F5E8', // Light green
          textColor: '#2E7D32',
        };
      case 'wishlist':
        return {
          label: 'Reading List',
          color: '#FFF3E0', // Light orange/peach
          textColor: '#E65100',
        };
      default:
        return {
          label: status,
          color: '#F5F5F5',
          textColor: '#666',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        backgroundColor: config.color,
        color: config.textColor,
        fontWeight: 500,
        fontSize: size === 'small' ? '0.75rem' : '0.8rem',
        height: size === 'small' ? 24 : 28,
        '& .MuiChip-label': {
          px: size === 'small' ? 1 : 1.5,
        },
      }}
    />
  );
};

export default StatusChip;