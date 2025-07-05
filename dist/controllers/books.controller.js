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
exports.deleteABookById = exports.updateABookById = exports.getABookById = exports.getAllBooks = exports.booksCount = exports.createBookPost = void 0;
const books_model_1 = __importDefault(require("../models/books.model"));
// Create A Book 
const createBookPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
});
exports.createBookPost = createBookPost;
// Books Count Function 
const booksCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.estimatedDocumentCount({});
        res.status(201).json({ count: result });
    }
    catch (error) {
        next(error);
    }
});
exports.booksCount = booksCount;
// Get All Books 
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book body 
        const { filter, sortBy = "createdAt", sort = "desc", limit, page } = req.query;
        console.log(page, limit);
        // make query filter object 
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        ;
        // making sort Option 
        const sortOption = {};
        sortOption[sortBy] = (sort === "asc" ? 1 : -1);
        // limit parse 
        const dataLimit = parseInt(limit, 10);
        // get all books from db 
        const getAllBooksResult = yield books_model_1.default.find(query).sort(sortOption).skip(Number(page) * dataLimit).limit(dataLimit);
        // response send after successful book create method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getAllBooksResult
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
// Get A Book By Id 
const getABookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        // get book from db 
        const getABookResult = yield books_model_1.default.findById(bookId);
        if (!getABookResult) {
            throw new Error("Id is not valid. Please give a Valid id");
        }
        // response send after successful book find method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getABookResult
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getABookById = getABookById;
// Get A Book By Id And Update
const updateABookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        const body = req.body;
        const book = yield books_model_1.default.findById(bookId);
        if (!book) {
            throw new Error("Not a valid book id");
        }
        ;
        yield book.updateABookData(body);
        // response send after successful book find method 
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateABookById = updateABookById;
// Get A Book By Id And Delete It
const deleteABookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        const book = yield books_model_1.default.findById(bookId);
        if (!book) {
            throw new Error("Not a valid book id");
        }
        ;
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
        next(error);
    }
});
exports.deleteABookById = deleteABookById;
