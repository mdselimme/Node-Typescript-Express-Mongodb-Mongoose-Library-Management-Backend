import { isValidObjectId, model, Schema, Types } from "mongoose";
import { IBorrowModel } from "../interfaces/borrows.interface";
import Books from "./books.model";


// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new Schema<IBorrowModel>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true,
        validate: {
            validator: async function (value) {
                if (!Types.ObjectId.isValid(value)) return false;
                const bookExists = await Books.findById(value);
                return !!bookExists;
            },
            message: props => `book id is not valid ${props.value}`
        },
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
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