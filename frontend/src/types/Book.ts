export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  tags: string[];
  notesCount: number;
  status: BookStatus;
  dateAdded: string;
  dateFinished?: string;
  rating?: number;
  description?: string;
}

export type BookStatus = 'reading' | 'finished' | 'wishlist';

export interface BookItemProps {
  book: Book;
  viewMode: 'list' | 'grid';
}

export interface BooksListProps {
  books: Book[];
}

export interface BooksGridProps {
  books: Book[];
}

export interface StatusChipProps {
  status: BookStatus;
  size?: 'small' | 'medium';
}

export interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onAddBook: (bookData: Omit<Book, 'id' | 'dateAdded' | 'notesCount'>) => void;
}