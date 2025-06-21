import { model, Schema, Types } from "mongoose";
import { IBorrowModel, IBorrowModelStatic } from "../interfaces/borrows.interface";
import Books from "./books.model";


// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new Schema<IBorrowModel>({
    book: {
        type: Schema.Types.ObjectId,
        required: [true, "book id is required"],
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

// Static Method for borrowing and update 
borrowsSchemaModel.statics.borrowBookWithUpdateQuantity = async function (borrowBody: IBorrowModel) {
    // destructer from borrow    
    const { book, quantity } = borrowBody;
    const bookFindDocu = await Books.findById(book);
    // if cannot find the book document in database 
    if (!bookFindDocu) {
        throw new Error("Book not found! Please give valid id");
    };
    //if book copies are not available or book copies is more than want
    if (!bookFindDocu.available) {
        throw new Error("Book is not available.");
    };
    if (bookFindDocu.copies < quantity) {
        throw new Error("Insufficient book copies.");
    };
    //minus quantity from book copies
    bookFindDocu.copies = bookFindDocu.copies - quantity;
    // if book copies is zero than update available false 
    if (bookFindDocu.copies === 0) {
        bookFindDocu.available = false
    }
    // save available and copies 
    await bookFindDocu.save();
    // create borrow method in database 
    const borrowResult = await this.create(borrowBody);
    return borrowResult;
};

// Borrows Model 
const Borrows = model<IBorrowModel, IBorrowModelStatic>("Borrows", borrowsSchemaModel);

export default Borrows;