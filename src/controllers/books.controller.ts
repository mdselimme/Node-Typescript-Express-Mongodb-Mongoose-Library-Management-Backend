import { Request, Response } from "express";
import Books from "../models/books.model";


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

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        // book body 
        const bookBody = req.query;
        // book insert in db 
        const getAllBooks = await Books.find({});
        // response send after successful book create method 
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: getAllBooks
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}


