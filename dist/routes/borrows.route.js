"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowsRouter = express_1.default.Router();
const borrows_controller_1 = require("../controllers/borrows.controller");
// borrow a book route post method 
borrowsRouter.post('/', borrows_controller_1.borrowABook);
//get borrow books summery route
borrowsRouter.get('/', borrows_controller_1.getBorrowBooksSummery);
// borrow a book delete by id 
borrowsRouter.delete('/:bookId', borrows_controller_1.deleteABorrowById);
exports.default = borrowsRouter;
