import express from "express";
import { Books } from "../models/Books.js";
const bookRoutes = express.Router();

// 1. GET /books - Retrieve all books
bookRoutes.get('/books', async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// 2. POST /books - Add a new book
bookRoutes.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await Books.create({ title, author });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. PUT /books/:id - Mark a book as read (toggle status)
bookRoutes.put('/books/:id', async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Toggle status between 'unread' and 'read'
    book.status = book.status === 'unread' ? 'read' : 'unread';
    const updatedBook = await book.save();
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID or update failed' });
  }
});

// 4. DELETE /books/:id - Delete a specific book
bookRoutes.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID or delete failed' });
  }
});

export default bookRoutes;