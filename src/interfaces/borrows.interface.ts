import { Types } from "mongoose"



// Borrow Model InterFace 
export interface IBorrowModel {
    book: Types.ObjectId,
    quantity: number,
    dueData: Date
};