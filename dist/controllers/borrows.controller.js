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
exports.deleteABorrowById = exports.getBorrowBooksSummery = exports.borrowABook = void 0;
const borrows_model_1 = __importDefault(require("../models/borrows.model"));
// Borrow A Book function 
const borrowABook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // borrow Book body 
        const borrowABookBody = req.body;
        // insert borrow in database and send instance method 
        const borrowResult = yield borrows_model_1.default.borrowBookWithUpdateQuantity(borrowABookBody);
        // response after successful insert 
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowResult
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowABook = borrowABook;
// Borrow A Books Summery Get function 
const getBorrowBooksSummery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // insert borrow in database 
        const borrowBookSummeryResult = yield borrows_model_1.default.aggregate([
            // join table each other 
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            // bookdata array to object 
            {
                $unwind: "$bookData"
            },
            // grouping and sum borrows quantity
            {
                $group: {
                    _id: "$book",
                    totalQuantity: {
                        $sum: "$quantity"
                    },
                    book: {
                        $first: "$bookData"
                    }
                }
            },
            // lookup the object 
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1
                }
            }
        ]);
        // response after successful insert 
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowBookSummeryResult
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrowBooksSummery = getBorrowBooksSummery;
// Delete A book By Id 
const deleteABorrowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield borrows_model_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            throw new Error("Book Id Not Found. Give a valid id.");
        }
        res.status(200).json({
            success: true,
            message: "Borrow book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteABorrowById = deleteABorrowById;
