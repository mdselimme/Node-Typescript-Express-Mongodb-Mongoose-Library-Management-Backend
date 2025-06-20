import { model, Schema } from "mongoose";
import { IBorrowModel } from "../interfaces/borrows.interface";


// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new Schema<IBorrowModel>({
    book: Schema.Types.ObjectId,
    quantity: Number,
    dueData: Date
});

// Borrows Model 
const Borrows = model("Borrows", borrowsSchemaModel);

export default Borrows;