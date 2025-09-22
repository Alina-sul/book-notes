import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface NewBook {
  title: string;
  author: string;
}

export interface CreateBookResponse {
  id: number;
}

export const booksApi = {
  async createBook(book: NewBook): Promise<CreateBookResponse> {
    const response = await api.post<CreateBookResponse>('/books/create', book);
    return response.data;
  },

  // Placeholder for future endpoints
  async getBooks(): Promise<Book[]> {
    // This endpoint doesn't exist yet, but we'll add it later
    const response = await api.get<Book[]>('/books');
    return response.data;
  },

  async getBook(id: number): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  async updateBook(id: number, book: Partial<NewBook>): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  async deleteBook(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};