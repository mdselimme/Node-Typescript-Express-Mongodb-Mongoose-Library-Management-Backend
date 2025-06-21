import { IBookModel } from './../interfaces/books.interface';
import { model, Schema } from "mongoose";


// Books Schema Model For Validation Object Model 
const bookSchemaModel = new Schema<IBookModel>({
    title: {
        type: String,
        required: [true, "book title is required"],
        trim: true,
        minlength: [3, "Book name needed min 3 character"]
    },
    author: {
        type: String,
        required: [true, "author is required"],
        trim: true,
        minlength: [3, "Author name needed min 3 character"]
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
        trim: true,
        uppercase: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: `{VALUE} is not supported. Please give from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)`
        }
    },
    isbn: {
        type: String,
        required: [true, "isbn is required and must be unique"],
        trim: true,
        unique: [true, `isbn is duplicate.Please isbn must be an unique value`]
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "books copies are required"],
        validate: {
            validator: function (val) {
                return val >= 0 && typeof val === "number";
            },
            message: props => `Value must be greater than ${props.value} and number type`
        }
    },
    available: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

// Update Books Copies and Available 
bookSchemaModel.methods.updateBookCopiesAndAvailable = async function (newBookCopies: number) {
    if (newBookCopies <= 0) {
        throw new Error("Copies must be a positive number");
    };
    // update copies 
    this.copies = this.copies + newBookCopies;
    if (this.copies > 0) {
        this.available = true
    } else if (this.copies === 0) {
        this.available = false
    }
    await this.save();
    return this;
}



// Books Model 
const Books = model<IBookModel>('Books', bookSchemaModel);

export default Books;

