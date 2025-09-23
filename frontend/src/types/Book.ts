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
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

export interface BooksListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

export interface BooksGridProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
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

export interface EditBookModalProps {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onEditBook: (bookData: Omit<Book, 'dateAdded' | 'notesCount'>) => void;
}

export interface DeleteConfirmDialogProps {
  open: boolean;
  bookTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}