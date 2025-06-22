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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Books Schema Model For Validation Object Model 
const bookSchemaModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "book title is required"],
        trim: true,
        minlength: [3, "Book name needed min 3 character"]
    },
    author: {
        type: String,
        required: [true, "author is required"],
        trim: true,
        minlength: [3, "Author name needed min 3 character"]
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
        trim: true,
        uppercase: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: `{VALUE} is not supported. Please give from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)`
        }
    },
    isbn: {
        type: String,
        required: [true, "isbn is required and must be unique"],
        trim: true,
        unique: [true, `isbn is duplicate.Please isbn must be an unique value`]
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "books copies are required"],
        validate: {
            validator: function (val) {
                return val >= 0 && typeof val === "number";
            },
            message: props => `Value must be greater than ${props.value} and number type`
        }
    },
    available: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
//Intance method Update Books Copies and Available 
bookSchemaModel.methods.updateBookCopiesAndAvailable = function (newBookCopies) {
    return __awaiter(this, void 0, void 0, function* () {
        if (newBookCopies <= 0) {
            throw new Error("Copies must be a positive number");
        }
        ;
        // update copies 
        this.copies = this.copies + newBookCopies;
        if (this.copies > 0) {
            this.available = true;
        }
        else if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
        return this;
    });
};
// Books Model 
const Books = (0, mongoose_1.model)('Books', bookSchemaModel);
exports.default = Books;
