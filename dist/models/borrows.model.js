"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Borrows Schema Model with Mongoose 
const borrowsSchemaModel = new mongoose_1.Schema({
    book: mongoose_1.Schema.Types.ObjectId,
    quantity: Number,
    dueData: Date
}, {
    versionKey: false,
    timestamps: true
});
// Borrows Model 
const Borrows = (0, mongoose_1.model)("Borrows", borrowsSchemaModel);
exports.default = Borrows;
