"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Books Schema Model For Validation Object Model 
const bookSchemaModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Book name needed min 3 character"]
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Author name needed min 3 character"]
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// Books Model 
const Books = (0, mongoose_1.model)('Books', bookSchemaModel);
exports.default = Books;
