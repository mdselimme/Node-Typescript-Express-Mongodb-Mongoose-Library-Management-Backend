import express from "express";
import { createBookPost, getABookById, getAllBooks } from "../controllers/books.controller";
const booksRouter: express.Router = express.Router();

// create book post 
booksRouter.post('/', createBookPost);
// get all books 
booksRouter.get('/', getAllBooks);
// get a book by id
booksRouter.get('/:bookId', getABookById);


export default booksRouter;