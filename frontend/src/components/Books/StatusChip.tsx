import React from 'react';
import { Chip } from '@mui/material';
import { StatusChipProps } from '../../types';
import { BOOK_STATUS_COLORS, BOOK_STATUS_LABELS } from '../../constants';

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const getStatusConfig = (status: StatusChipProps['status']) => {
    const colors = BOOK_STATUS_COLORS[status];
    const label = BOOK_STATUS_LABELS[status];

    if (colors && label) {
      return {
        label,
        color: colors.background,
        textColor: colors.text,
      };
    }

    return {
      label: status,
      color: '#F5F5F5',
      textColor: '#666',
    };
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