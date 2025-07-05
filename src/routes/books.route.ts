import express from "express";
const booksRouter: express.Router = express.Router();
import { booksCount, createBookPost, deleteABookById, getABookById, getAllBooks, updateABookById } from "../controllers/books.controller";

// create book post 
booksRouter.post('/', createBookPost);
// count book document 
booksRouter.get('/books-count', booksCount);
// get all books 
booksRouter.get('/', getAllBooks);
// get a book by id
booksRouter.get('/:bookId', getABookById);
// update a book by id
booksRouter.put('/:bookId', updateABookById);
// delete a book by id
booksRouter.delete('/:bookId', deleteABookById);


export default booksRouter;