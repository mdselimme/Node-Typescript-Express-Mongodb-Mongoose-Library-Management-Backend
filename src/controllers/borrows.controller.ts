import { NextFunction, Request, Response } from "express";
import Borrows from "../models/borrows.model";


// Borrow A Book function 
export const borrowABook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // borrow Book body 
        const borrowABookBody = req.body;
        // insert borrow in database and send instance method 
        const borrowResult = await Borrows.borrowBookWithUpdateQuantity(borrowABookBody);
        // response after successful insert 
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowResult
        });
    } catch (error) {
        next(error);
    }
};

// Borrow A Books Summery Get function 
export const getBorrowBooksSummery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // insert borrow in database 
        const borrowBookSummeryResult = await Borrows.aggregate([
            // join table each other 
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            // book data array to object 
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
                    },
                }
            },
            // lookup the object 
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                        author: "$book.author"
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
    } catch (error) {
        next(error);
    }
};

// Delete A book By Id 
export const deleteABorrowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await Borrows.findByIdAndDelete(bookId);

        if (!deletedBook) {
            throw new Error("Book Id Not Found. Give a valid id.");
        }
        res.status(200).json({
            success: true,
            message: "Borrow book deleted successfully",
            data: null,
        });

    } catch (error) {
        next(error);
    }
}