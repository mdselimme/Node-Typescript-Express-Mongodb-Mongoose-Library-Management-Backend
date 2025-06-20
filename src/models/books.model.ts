import { model, Schema } from "mongoose";
import { IBookModel } from "../interfaces/books.interface";

// Books Schema Model For Validation Object Model 
const bookSchemaModel = new Schema<IBookModel>({
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
});

// Books Model 
const Books = model('Books', bookSchemaModel);

export default Books;

