const express = require('express');
const router = express.Router();
const {Book} = require('../models');

const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`Book - ${el}`, `description book - ${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.render("books/index", {
        title: "Главная",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Book | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = stor;
    const {title, description, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, favorite, fileCover, fileName);
    books.push(newBook);
    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        res.render("books/view", {
            title: "Book | view",
            book: books[index],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        res.render("books/update", {
            title: "Book | view",
            book: books[index],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {title, description, favorite, fileCover, fileName} = req.body;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            favorite,
            fileCover,
            fileName
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});


module.exports = router;

