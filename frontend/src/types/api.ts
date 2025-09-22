// API-related types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  coverUrl?: string;
  tags: string[];
  status: 'reading' | 'finished' | 'wishlist';
  rating?: number;
  description?: string;
}