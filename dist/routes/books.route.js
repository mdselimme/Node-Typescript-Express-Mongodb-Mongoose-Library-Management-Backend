"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter = express_1.default.Router();
const books_controller_1 = require("../controllers/books.controller");
// create book post 
booksRouter.post('/', books_controller_1.createBookPost);
// get all books 
booksRouter.get('/', books_controller_1.getAllBooks);
// get a book by id
booksRouter.get('/:bookId', books_controller_1.getABookById);
// update a book by id
booksRouter.patch('/:bookId', books_controller_1.updateABookById);
// delete a book by id
booksRouter.delete('/:bookId', books_controller_1.deleteABookById);
exports.default = booksRouter;
