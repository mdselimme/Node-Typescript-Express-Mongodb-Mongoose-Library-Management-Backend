import express from "express";
const borrowsRouter: express.Router = express.Router();
import { borrowABook, deleteABorrowById, getBorrowBooksSummery } from "../controllers/borrows.controller";

// borrow a book route post method 
borrowsRouter.post('/', borrowABook);
//get borrow books summery route
borrowsRouter.get('/', getBorrowBooksSummery);
// borrow a book delete by id 
borrowsRouter.delete('/:bookId', deleteABorrowById);


export default borrowsRouter;