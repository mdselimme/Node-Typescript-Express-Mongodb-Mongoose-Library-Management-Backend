"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    // Main Error Message 
    let errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };
    // If error cause when validation error 
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        errorResponseMessage = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err.errors
            }
        };
    }
    ;
    // If error cause when validator 
    if (err instanceof mongoose_1.default.Error.ValidatorError) {
        errorResponseMessage = {
            message: 'Validator failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err
            }
        };
    }
    ;
    // If error cause when case error 
    if (err instanceof mongoose_1.default.Error.CastError) {
        errorResponseMessage = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err
            }
        };
    }
    ;
    // send error message 
    const errorStatusCode = err.statusCode || 404;
    res.status(errorStatusCode).send(errorResponseMessage);
};
exports.errorHandler = errorHandler;
