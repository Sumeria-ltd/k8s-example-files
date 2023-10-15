const express = require('express');
const app = express();
require('./db');

app.use(express.json());

const BookSchema = new require('mongoose').Schema({
    title: String,
    author: String,
    isbn: String
});
const Book = require('mongoose').model('Book', BookSchema);

app.get('/info', async (req, res) => {
    res.send('<h1>This is the BookDemo Service</h1>')
})

// Add New Book
app.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.send(newBook);
});

// Update Book
app.put('/books/:isbn', async (req, res) => {
    const updatedBook = await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true });
    res.send(updatedBook);
});

// List All Books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

// Get Book by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
    const book = await Book.findOne({ isbn: req.params.isbn });
    res.send(book);
});

// Get Book by Title
app.get('/books/title/:title', async (req, res) => {
    const book = await Book.findOne({ title: req.params.title });
    res.send(book);
});

// Delete Book by ISBN
app.delete('/books/:isbn', async (req, res) => {
    await Book.findOneAndDelete({ isbn: req.params.isbn });
    res.send('Book deleted');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
