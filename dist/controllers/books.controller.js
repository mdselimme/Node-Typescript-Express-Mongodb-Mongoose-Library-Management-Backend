"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteABookById = exports.updateABookById = exports.getABookById = exports.getAllBooks = exports.createBookPost = void 0;
const books_model_1 = __importDefault(require("../models/books.model"));
// Create A Book 
const createBookPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book body 
        const bookBody = req.body;
        // book insert in db 
        const bookInsertResult = yield books_model_1.default.create(bookBody);
        // response send after successful book create method 
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookInsertResult
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.createBookPost = createBookPost;
// Get All Books 
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book body 
        const bookBody = req.query;
        console.log(bookBody);
        // get all books from db 
        const getAllBooksResult = yield books_model_1.default.find({});
        // response send after successful book create method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getAllBooksResult
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.getAllBooks = getAllBooks;
// Get A Book By Id 
const getABookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        console.log(bookId);
        // get book from db 
        const getABookResult = yield books_model_1.default.findById(bookId);
        // response send after successful book find method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getABookResult
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.getABookById = getABookById;
// Get A Book By Id And Update
const updateABookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        // book update body 
        const updateBookBody = req.body;
        // get book from db and update book
        const updateABookByIdResult = yield books_model_1.default.findByIdAndUpdate(bookId, updateBookBody, { new: true });
        // response send after successful book find method 
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateABookByIdResult
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.updateABookById = updateABookById;
// Get A Book By Id And Delete It
const deleteABookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        // get book from db and delete book
        yield books_model_1.default.findByIdAndDelete(bookId);
        // response send after successful book delete method 
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.deleteABookById = deleteABookById;
