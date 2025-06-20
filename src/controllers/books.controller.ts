import { Request, Response } from "express";
import Books from "../models/books.model";

// Create A Book 
export const createBookPost = async (req: Request, res: Response) => {
    try {
        // book body 
        const bookBody = req.body;
        // book insert in db 
        const bookInsertResult = await Books.create(bookBody);
        // response send after successful book create method 
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookInsertResult
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

// Get All Books 
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        // book body 
        const bookBody = req.query;
        console.log(bookBody)
        // get all books from db 
        const getAllBooksResult = await Books.find({});
        // response send after successful book create method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getAllBooksResult
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

// Get A Book By Id 
export const getABookById = async (req: Request, res: Response) => {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        console.log(bookId)
        // get book from db 
        const getABookResult = await Books.findById(bookId);
        // response send after successful book find method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getABookResult
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

// Get A Book By Id 
export const updateABookById = async (req: Request, res: Response) => {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        // book update body 
        const updateBookBody = req.body;
        // get book from db 
        const updateABookByIdResult = await Books.findByIdAndUpdate(bookId, updateBookBody, { new: true });
        // response send after successful book find method 
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateABookByIdResult
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};


