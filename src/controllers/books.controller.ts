import { NextFunction, Request, Response } from "express";
import Books from "../models/books.model";

// Create A Book 
export const createBookPost = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error)
    }
};

// Books Count Function 
export const booksCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Books.estimatedDocumentCount({});
        res.status(201).json({ count: result });
    } catch (error) {
        next(error)
    }

}

// Get All Books 
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // book body 
        const { filter, sortBy = "createdAt", sort = "desc", limit, page } = req.query;

        // make query filter object 
        const query: Record<string, unknown> = {};
        if (filter) {
            query.genre = filter
        };
        // making sort Option 
        const sortOption: Record<string, 1 | -1> = {};
        sortOption[sortBy as string] = (sort === "asc" ? 1 : -1);
        // limit parse 
        const dataLimit = parseInt(limit as string, 10);
        // get all books from db with sor option 
        const getAllBooksResult = await Books.find(query).sort(sortOption).skip(Number(page) * dataLimit).limit(dataLimit);
        // response send after successful book create method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getAllBooksResult
        });
    } catch (error) {
        next(error)
    }
};

// Get A Book By Id 
export const getABookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        // get book from db 
        const getABookResult = await Books.findById(bookId);
        if (!getABookResult) {
            throw new Error("Id is not valid. Please give a Valid id");
        }
        // response send after successful book find method 
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: getABookResult
        });
    } catch (error) {
        next(error)
    }
};

// Get A Book By Id And Update
export const updateABookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        const body = req.body;
        const book = await Books.findById(bookId);
        if (!book) {
            throw new Error("Not a valid book id");
        };
        await book.updateABookData(body);
        // response send after successful book find method 
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        next(error)
    }
};

// Get A Book By Id And Delete It
export const deleteABookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // book Id Find 
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId);
        if (!book) {
            throw new Error("Not a valid book id");
        };
        // get book from db and delete book
        await Books.findByIdAndDelete(bookId);
        // response send after successful book delete method 
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    } catch (error) {
        next(error)
    }
};


