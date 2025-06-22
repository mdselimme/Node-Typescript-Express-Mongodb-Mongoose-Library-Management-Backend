import mongoose, { model, Schema, Types } from "mongoose";
import { IBorrowModel, IBorrowModelStatic } from "../interfaces/borrows.interface";
import Books from "./books.model";
import { NextFunction } from "express";


// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new Schema<IBorrowModel>({
    book: {
        type: Schema.Types.ObjectId,
        required: [true, "book id is required"],
        validate: {
            validator: function (val: Types.ObjectId) {
                return mongoose.Types.ObjectId.isValid(val);
            },
            message: "Invalid Book ObjectId"
        }
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required."],
    }
}, {
    versionKey: false,
    timestamps: true
});

// Static Method for borrowing and update 
borrowsSchemaModel.statics.borrowBookWithUpdateQuantity = async function (borrowBody: IBorrowModel) {
    // property find from borrow    
    const { book, quantity } = borrowBody;
    const bookFindDocument = await Books.findById(book);
    // if cannot find the book document in database 
    if (!bookFindDocument) {
        throw new Error("Book not found! Please give valid id");
    };
    //if book copies are not available or book copies is more than want
    if (!bookFindDocument.available) {
        throw new Error("Book is not available.");
    };
    if (bookFindDocument.copies < quantity) {
        throw new Error("Insufficient book copies.");
    };
    //minus quantity from book copies
    bookFindDocument.copies = bookFindDocument.copies - quantity;
    // if book copies is zero than update available false 
    if (bookFindDocument.copies === 0) {
        bookFindDocument.available = false
    }
    // save available and copies 
    await bookFindDocument.save();
    // create borrow method in database 
    const borrowResult = await this.create(borrowBody);
    return borrowResult;
};

// Find And Delete Pre middleware 
borrowsSchemaModel.pre("findOneAndDelete", async function (this: mongoose.Query<IBorrowModel, IBorrowModel>, next) {
    try {
        const query = this.getQuery();
        const doc = await Borrows.findOne(query);
        if (doc) {
            console.log("going to delete doc")
        } else {
            console.log('No doc found in pre middleware');
        }
        next();
    } catch (error) {
        next(error as Error)
    }
});

//Deleted Book Post middleware
borrowsSchemaModel.post("findOneAndDelete", async function (doc, next: NextFunction) {
    if (doc) {
        console.log("Deleted Book:", doc.book)
    } else {
        console.log('Nothing was deleted');
    }
    next();
});



// Borrows Model 
const Borrows = model<IBorrowModel, IBorrowModelStatic>("Borrows", borrowsSchemaModel);

export default Borrows;