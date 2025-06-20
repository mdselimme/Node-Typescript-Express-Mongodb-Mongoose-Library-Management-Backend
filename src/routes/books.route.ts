import express from "express";
import { createBookPost, deleteABookById, getABookById, getAllBooks, updateABookById } from "../controllers/books.controller";
const booksRouter: express.Router = express.Router();

// create book post 
booksRouter.post('/', createBookPost);
// get all books 
booksRouter.get('/', getAllBooks);
// get a book by id
booksRouter.get('/:bookId', getABookById);
// update a book by id
booksRouter.patch('/:bookId', updateABookById);
// delete a book by id
booksRouter.delete('/:bookId', deleteABookById);


export default booksRouter;