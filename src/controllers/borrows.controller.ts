import { Request, Response } from "express";
import Borrows from "../models/borrows.model";


// Borrow A Book function 
export const borrowABook = async (req: Request, res: Response) => {
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
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

// Borrow A Books Summery Get function 
export const getBorrowBooksSummery = async (req: Request, res: Response) => {
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
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};