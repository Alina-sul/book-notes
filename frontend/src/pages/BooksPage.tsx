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
import EditBookModal from '../components/Books/EditBookModal';
import DeleteConfirmDialog from '../components/Books/DeleteConfirmDialog';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

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

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (updatedBookData: Omit<Book, 'dateAdded' | 'notesCount'>) => {
    setBooks(prev => prev.map(book =>
      book.id === updatedBookData.id
        ? { ...book, ...updatedBookData }
        : book
    ));
    setSelectedBook(null);
  };

  const handleDeleteBook = (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setBookToDelete(book);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      setBooks(prev => prev.filter(book => book.id !== bookToDelete.id));
      setBookToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setBookToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEditModal = () => {
    setSelectedBook(null);
    setIsEditModalOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: 12 }}>
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
            <BooksList
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          ) : (
            <BooksGrid
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          )}
        </Box>
      </Box>

      <AddBookModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />

      <EditBookModal
        open={isEditModalOpen}
        book={selectedBook}
        onClose={handleCloseEditModal}
        onEditBook={handleUpdateBook}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        bookTitle={bookToDelete?.title || ''}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default BooksPage;