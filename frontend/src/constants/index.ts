// Application constants

export const APP_CONFIG = {
  title: 'Book Notes',
  maxWidth: '1200px',
  defaultCoverUrl: 'https://via.placeholder.com/120x180?text=No+Cover',
} as const;

export const BOOK_STATUS = {
  READING: 'reading',
  FINISHED: 'finished',
  WISHLIST: 'wishlist',
} as const;

export const BOOK_STATUS_LABELS = {
  [BOOK_STATUS.READING]: 'Currently Reading',
  [BOOK_STATUS.FINISHED]: 'Finished',
  [BOOK_STATUS.WISHLIST]: 'Reading List',
} as const;

export const BOOK_STATUS_COLORS = {
  [BOOK_STATUS.READING]: {
    background: '#E3F2FD',
    text: '#1565C0',
  },
  [BOOK_STATUS.FINISHED]: {
    background: '#E8F5E8',
    text: '#2E7D32',
  },
  [BOOK_STATUS.WISHLIST]: {
    background: '#FFF3E0',
    text: '#E65100',
  },
} as const;

export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export const ROUTES = {
  HOME: '/',
  BOOKS: '/books',
  NOTES: '/notes',
  ANALYSIS: '/analysis',
} as const;