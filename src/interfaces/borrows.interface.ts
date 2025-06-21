import { Model, Types } from "mongoose"



// Borrow Model InterFace 
export interface IBorrowModel extends Document {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
};

// Borrow Static Method Function Interface 
export interface IBorrowModelStatic extends Model<IBorrowModel> {
    borrowBookWithUpdateQuantity(borrowBody: IBorrowModel): Promise<IBorrowModel>
};