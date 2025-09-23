import React from 'react';
import {
  Box,
  Chip,
  Typography
} from '@mui/material';
import { BookStatus } from '../../types';
import { BOOK_STATUS, BOOK_STATUS_LABELS } from '../../constants';

interface StatusSelectorProps {
  status: BookStatus;
  onStatusChange: (status: BookStatus) => void;
  label?: string;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  onStatusChange,
  label = "Reading Status"
}) => {
  const statusOptions = [
    { value: BOOK_STATUS.WISHLIST, label: BOOK_STATUS_LABELS.wishlist },
    { value: BOOK_STATUS.READING, label: BOOK_STATUS_LABELS.reading },
    { value: BOOK_STATUS.FINISHED, label: BOOK_STATUS_LABELS.finished },
  ];

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {statusOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            onClick={() => onStatusChange(option.value as BookStatus)}
            variant={status === option.value ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: status === option.value ? '#000' : 'transparent',
              color: status === option.value ? 'white' : '#666',
              borderColor: status === option.value ? '#000' : '#ddd',
              '&:hover': {
                backgroundColor: status === option.value ? '#333' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StatusSelector;