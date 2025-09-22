import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { BookFilters, ViewMode, Book } from '../types';
import { mockBooks } from '../data/mockBooks';
import { filterBooks, createNewBook } from '../utils/bookUtils';
import SearchFilterBar from '../components/Books/SearchFilterBar';
import Sidebar from '../components/Books/Sidebar';
import BooksList from '../components/Books/BooksList';
import BooksGrid from '../components/Books/BooksGrid';
import AddBookModal from '../components/Books/AddBookModal';

const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<BookFilters>({
    reading: true,
    finished: true,
    wishlist: true,
  });
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter books based on search query and filters
  const filteredBooks = filterBooks(books, searchQuery, filters);

  const handleFilterChange = (filterType: keyof BookFilters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleAddBook = (bookData: Omit<Book, 'id' | 'dateAdded' | 'notesCount'>) => {
    const newBook = createNewBook(bookData, books);
    setBooks(prev => [...prev, newBook]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddBookClick={() => setIsAddModalOpen(true)}
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

      <AddBookModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </Container>
  );
};

export default BooksPage;