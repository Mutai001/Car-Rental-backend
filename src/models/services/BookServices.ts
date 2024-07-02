import { Repository } from '@drizzle-orm/core';
import { Book } from '../Book';
import drizzle from '../../config/database';

export class BookService {
  private bookRepository: Repository<Book>;

  constructor() {
    this.bookRepository = new Repository<Book>(Book, drizzle);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }

  async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOne(id);
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    const newBook = new Book();
    Object.assign(newBook, bookData);
    return await this.bookRepository.create(newBook);
  }

  async updateBook(id: number, bookData: Partial<Book>): Promise<Book | null> {
    const existingBook = await this.bookRepository.findOne(id);
    if (!existingBook) return null;

    Object.assign(existingBook, bookData);
    return await this.bookRepository.update(existingBook);
  }

  async deleteBook(id: number): Promise<boolean> {
    return await this.bookRepository.delete(id);
  }
}
