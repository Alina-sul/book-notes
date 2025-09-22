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
import { BookFilters } from '../../types/Book';

interface SidebarProps {
  filters: BookFilters;
  onFilterChange: (filterType: keyof BookFilters) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const filterOptions = [
    {
      key: 'reading' as keyof BookFilters,
      label: 'Currently Reading',
      checked: filters.reading,
      color: '#1565C0', // Blue
      bgColor: '#E3F2FD',
    },
    {
      key: 'finished' as keyof BookFilters,
      label: 'Finished Reading',
      checked: filters.finished,
      color: '#2E7D32', // Green
      bgColor: '#E8F5E8',
    },
    {
      key: 'wishlist' as keyof BookFilters,
      label: 'Reading List',
      checked: filters.wishlist,
      color: '#E65100', // Orange
      bgColor: '#FFF3E0',
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