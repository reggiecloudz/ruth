"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("../models/Book"));
const createBook = (req, res, next) => {
    const { title, author } = req.body;
    const book = new Book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ err }));
};
const readBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findById(bookId)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' })))
        .catch((err) => res.status(500).json({ err }));
};
const readAllBooks = (req, res, next) => {
    return Book_1.default.find()
        .populate('author')
        .then((books) => res.status(200).json({ books }))
        .catch((err) => res.status(500).json({ err }));
};
const updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            res.status(404).json({ message: 'Not Found' });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
const deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not Found' })))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = { createBook, readBook, readAllBooks, updateBook, deleteBook };
