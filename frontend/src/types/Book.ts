export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  tags: string[];
  notesCount: number;
  status: 'reading' | 'finished' | 'wishlist';
  dateAdded: string;
  dateFinished?: string;
  rating?: number;
  description?: string;
}

export type BookStatus = 'reading' | 'finished' | 'wishlist';
export type ViewMode = 'list' | 'grid';

export interface BookFilters {
  reading: boolean;
  finished: boolean;
  wishlist: boolean;
}