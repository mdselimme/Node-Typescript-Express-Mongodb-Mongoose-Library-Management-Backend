import express from "express";
import { createBookPost, getAllBooks } from "../controllers/books.controller";
const booksRouter: express.Router = express.Router();

// create book post 
booksRouter.post('/', createBookPost);
booksRouter.get('/', getAllBooks);


export default booksRouter;