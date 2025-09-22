import React from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Check as CheckIcon
} from '@mui/icons-material';
import { SidebarProps } from '../../types';
import { BOOK_STATUS_COLORS, BOOK_STATUS_LABELS } from '../../constants';

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const filterOptions = [
    {
      key: 'reading' as keyof SidebarProps['filters'],
      label: BOOK_STATUS_LABELS.reading,
      checked: filters.reading,
      color: BOOK_STATUS_COLORS.reading.text,
      bgColor: BOOK_STATUS_COLORS.reading.background,
    },
    {
      key: 'finished' as keyof SidebarProps['filters'],
      label: BOOK_STATUS_LABELS.finished,
      checked: filters.finished,
      color: BOOK_STATUS_COLORS.finished.text,
      bgColor: BOOK_STATUS_COLORS.finished.background,
    },
    {
      key: 'wishlist' as keyof SidebarProps['filters'],
      label: BOOK_STATUS_LABELS.wishlist,
      checked: filters.wishlist,
      color: BOOK_STATUS_COLORS.wishlist.text,
      bgColor: BOOK_STATUS_COLORS.wishlist.background,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: 250,
        p: 3,
        height: 'fit-content',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filterOptions.map((option) => (
          <FormControlLabel
            key={option.key}
            control={
              <Checkbox
                checked={option.checked}
                onChange={() => onFilterChange(option.key)}
                icon={
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: `1px solid ${option.bgColor}`,
                      borderRadius: 0.5,
                      backgroundColor: option.bgColor,
                    }}
                  />
                }
                checkedIcon={
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: `1px solid ${option.bgColor}`,
                      borderRadius: 0.5,
                      backgroundColor: option.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 14, color: option.color }} />
                  </Box>
                }
                sx={{ mr: 1 }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                {option.label}
              </Typography>
            }
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                flex: 1,
              },
              '&:hover': {
                backgroundColor: '#f8f8f8',
                borderRadius: 1,
              },
              py: 0.5,
              px: 1,
              ml: -1,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default Sidebar;