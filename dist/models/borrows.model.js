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
const mongoose_1 = require("mongoose");
const books_model_1 = __importDefault(require("./books.model"));
// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "book id is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required."]
    }
}, {
    versionKey: false,
    timestamps: true
});
// Static Method for borrowing and update 
borrowsSchemaModel.statics.borrowBookWithUpdateQuantity = function (borrowBody) {
    return __awaiter(this, void 0, void 0, function* () {
        // destructer from borrow    
        const { book, quantity } = borrowBody;
        const bookFindDocu = yield books_model_1.default.findById(book);
        // if cannot find the book document in database 
        if (!bookFindDocu) {
            throw new Error("Book not found! Please give valid id");
        }
        ;
        //if book copies are not available or book copies is more than want
        if (!bookFindDocu.available) {
            throw new Error("Book is not available.");
        }
        ;
        if (bookFindDocu.copies < quantity) {
            throw new Error("Insufficient book copies.");
        }
        ;
        //minus quantity from book copies
        bookFindDocu.copies = bookFindDocu.copies - quantity;
        // if book copies is zero than update available false 
        if (bookFindDocu.copies === 0) {
            bookFindDocu.available = false;
        }
        // save available and copies 
        yield bookFindDocu.save();
        // create borrow method in database 
        const borrowResult = yield this.create(borrowBody);
        return borrowResult;
    });
};
// Borrows Model 
const Borrows = (0, mongoose_1.model)("Borrows", borrowsSchemaModel);
exports.default = Borrows;
