"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    let errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };
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
    const errorStatusCode = err.statusCode || 500;
    res.status(errorStatusCode).send(errorResponseMessage);
};
exports.errorHandler = errorHandler;
