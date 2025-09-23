import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  FilterList as FilterListIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { SearchFilterBarProps, ViewMode } from '../../types';

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddBookClick,
}) => {
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: ViewMode | null,
  ) => {
    if (newViewMode !== null) {
      onViewModeChange(newViewMode);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    // This will be expanded later for actual filtering
    console.log('Filter changed:', event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        py: 2,
      }}
    >
      {/* Left side: Search bar and filter dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <TextField
          placeholder="Search books, authors, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="standard"
          sx={{
            minWidth: 300,
            maxWidth: 400,
            '& .MuiInput-root': {
              backgroundColor: 'transparent',
              '&:before': {
                borderBottomColor: '#d0d0d0',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#333',
              },
              '&.Mui-focused:after': {
                borderBottomColor: '#000',
              },
            },
            '& .MuiInput-input': {
              paddingBottom: '8px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value="all"
            onChange={handleFilterChange}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon sx={{ color: '#666', fontSize: 20 }} />
              </InputAdornment>
            }
            sx={{
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="all">All Filters</MenuItem>
            <MenuItem value="recent">Recently Added</MenuItem>
            <MenuItem value="rating">By Rating</MenuItem>
            <MenuItem value="notes">Most Notes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Right side: Add Book button and View mode toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          onClick={onAddBookClick}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            py: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Add Book
        </Button>

        <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewModeChange}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            border: '1px solid #d0d0d0',
            color: '#666',
            '&.Mui-selected': {
              backgroundColor: '#000',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            },
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          },
        }}
      >
        <ToggleButton value="list" aria-label="list view">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="grid" aria-label="grid view">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default SearchFilterBar;