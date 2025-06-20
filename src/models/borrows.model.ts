import { model, Schema } from "mongoose";
import { IBorrowModel } from "../interfaces/borrows.interface";


// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new Schema<IBorrowModel>({
    book: Schema.Types.ObjectId,
    quantity: {
        type: Number,
        required: [true, "Quantity is required."]
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required."]
    }
}, {
    versionKey: false,
    timestamps: true
});

// Borrows Model 
const Borrows = model("Borrows", borrowsSchemaModel);

export default Borrows;