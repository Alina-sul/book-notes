import { Book } from '../types/Book';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442460745i/840.jpg",
    tags: ["design", "psychology", "UX"],
    notesCount: 12,
    status: "reading",
    dateAdded: "2024-01-15",
    rating: 5
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
    tags: ["productivity", "self-help", "habits"],
    notesCount: 8,
    status: "finished",
    dateAdded: "2023-12-01",
    dateFinished: "2024-01-10",
    rating: 4
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
    tags: ["programming", "software engineering", "best practices"],
    notesCount: 25,
    status: "finished",
    dateAdded: "2023-10-15",
    dateFinished: "2023-11-20",
    rating: 5
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg",
    tags: ["history", "anthropology", "philosophy"],
    notesCount: 0,
    status: "wishlist",
    dateAdded: "2024-02-01"
  },
  {
    id: 5,
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
    tags: ["programming", "career", "software development"],
    notesCount: 15,
    status: "reading",
    dateAdded: "2024-01-20",
    rating: 4
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
    tags: ["psychology", "decision making", "behavioral economics"],
    notesCount: 18,
    status: "finished",
    dateAdded: "2023-09-01",
    dateFinished: "2023-10-10",
    rating: 5
  },
  {
    id: 7,
    title: "The Lean Startup",
    author: "Eric Ries",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333576876i/10127019.jpg",
    tags: ["business", "entrepreneurship", "startup"],
    notesCount: 0,
    status: "wishlist",
    dateAdded: "2024-02-05"
  },
  {
    id: 8,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1384758070i/18197267.jpg",
    tags: ["UX", "web design", "usability"],
    notesCount: 7,
    status: "reading",
    dateAdded: "2024-01-25",
    rating: 4
  },
  {
    id: 9,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545854312i/12609433.jpg",
    tags: ["psychology", "habits", "self-improvement"],
    notesCount: 11,
    status: "finished",
    dateAdded: "2023-11-01",
    dateFinished: "2023-12-15",
    rating: 4
  },
  {
    id: 10,
    title: "Zero to One",
    author: "Peter Thiel",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1414347376i/18050143.jpg",
    tags: ["business", "entrepreneurship", "innovation"],
    notesCount: 0,
    status: "wishlist",
    dateAdded: "2024-02-10"
  }
];