// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------


    // Complete the following functions:

    //filtering the books based on genre
    async listBooksByGenre(genre) { 
        try {
            const books = await booksModel.find({ genre });
            return books;
        } catch (error) {
            throw new Error('Failed to list books by genre');
        }
    }

    //increasing the count of available books
    async updateBookAvailability(bookId, quantity) { 
        try {
            const book = await booksModel.findById(bookId);
            if (!book) {
                throw new Error('Book not found');
            }
            book.availableCopies += quantity;
            await book.save();
            return book;
        } catch (error) {
            throw new Error('Failed to update book availability');
        }
    }

    //deletion of book
    async deleteBookById(bookId) { 
        try {
            const deletedBook = await booksModel.findByIdAndRemove(bookId);
            return deletedBook;
        } catch (error) {
            throw new Error('Failed to delete book');
        }
    }
}