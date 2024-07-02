import { Request, Response } from 'express';
import { BookService } from '../models/services/BookService';
import { Book } from '../models/Book';

const bookService = new BookService();

export async function getAllBooks(req: Request, res: Response): Promise<void> {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}

// Define other handler functions for getBookById, createBook, updateBook, deleteBook similarly
