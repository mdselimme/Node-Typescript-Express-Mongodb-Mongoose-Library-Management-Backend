"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const books_model_1 = __importDefault(require("./books.model"));
// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "book id is required"],
        validate: {
            validator: function (val) {
                return mongoose_1.default.Types.ObjectId.isValid(val);
            },
            message: "Invalid Book ObjectId"
        }
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        validate: {
            validator: function (value) {
                return typeof value === 'number' && !isNaN(value) && value > 0;
            },
            message: "Quantity value must be positive and number type"
        }
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required."],
        validate: {
            validator: function (value) {
                return !isNaN(value.getTime());
            },
            message: "Invalid date type. Date must be an ISO String"
        }
    }
}, {
    versionKey: false,
    timestamps: true
});
// Static Method for borrowing and update 
borrowsSchemaModel.statics.borrowBookWithUpdateQuantity = function (borrowBody) {
    return __awaiter(this, void 0, void 0, function* () {
        // property find from borrow    
        const { book, quantity } = borrowBody;
        const bookFindDocument = yield books_model_1.default.findById(book);
        // if cannot find the book document in database 
        if (!bookFindDocument) {
            throw new Error("Book not found! Please give valid id");
        }
        ;
        //if book copies are not available or book copies is more than want
        if (!bookFindDocument.available) {
            throw new Error("Book is not available.");
        }
        ;
        if (bookFindDocument.copies < quantity) {
            throw new Error("Insufficient book copies.");
        }
        ;
        //minus quantity from book copies
        bookFindDocument.copies = bookFindDocument.copies - quantity;
        // if book copies is zero than update available false 
        if (bookFindDocument.copies === 0) {
            bookFindDocument.available = false;
        }
        // save available and copies 
        yield bookFindDocument.save();
        // create borrow method in database 
        const borrowResult = yield this.create(borrowBody);
        return borrowResult;
    });
};
// Find And Delete Pre middleware 
borrowsSchemaModel.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = this.getQuery();
            const doc = yield Borrows.findOne(query);
            if (doc) {
                console.log("going to delete doc");
            }
            else {
                console.log('No doc found in pre middleware');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
//Deleted Book Post middleware
borrowsSchemaModel.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            console.log("Deleted Book:", doc.book);
        }
        else {
            console.log('Nothing was deleted');
        }
        next();
    });
});
// Borrows Model 
const Borrows = (0, mongoose_1.model)("Borrows", borrowsSchemaModel);
exports.default = Borrows;
