import { Document } from "mongoose";



// Book Model InterFace 
export interface IBookModel {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
};

// Update Books Copies and Available Interface 
export interface IBookModel extends Document {
    updateBookCopiesAndAvailable(newBookCopies: number): Promise<IBookModel>;
}