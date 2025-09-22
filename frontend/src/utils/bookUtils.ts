import { Book, BookFilters } from '../types';

export const filterBooks = (
  books: Book[],
  searchQuery: string,
  filters: BookFilters
): Book[] => {
  return books.filter(book => {
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
};

export const generateBookId = (existingBooks: Book[]): number => {
  return Math.max(...existingBooks.map(b => b.id), 0) + 1;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const createNewBook = (
  bookData: Omit<Book, 'id' | 'dateAdded' | 'notesCount'>,
  existingBooks: Book[]
): Book => {
  return {
    ...bookData,
    id: generateBookId(existingBooks),
    dateAdded: getCurrentDate(),
    notesCount: 0,
  };
};

export const formatNotesCount = (count: number): string => {
  return `${count} ${count === 1 ? 'note' : 'notes'}`;
};