import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { BookFilters, ViewMode } from '../types/Book';
import { mockBooks } from '../data/mockBooks';
import SearchFilterBar from '../components/Books/SearchFilterBar';
import Sidebar from '../components/Books/Sidebar';
import BooksList from '../components/Books/BooksList';
import BooksGrid from '../components/Books/BooksGrid';

const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<BookFilters>({
    reading: true,
    finished: true,
    wishlist: true,
  });

  // Filter books based on search query and filters
  const filteredBooks = mockBooks.filter(book => {
    // Search filter
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status filter
    const matchesStatus = (filters.reading && book.status === 'reading') ||
                         (filters.finished && book.status === 'finished') ||
                         (filters.wishlist && book.status === 'wishlist');

    return matchesSearch && matchesStatus;
  });

  const handleFilterChange = (filterType: keyof BookFilters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <Box sx={{ flex: 1 }}>
          {viewMode === 'list' ? (
            <BooksList books={filteredBooks} />
          ) : (
            <BooksGrid books={filteredBooks} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BooksPage;