import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // Main Error Message 
    let errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };

    // If error cause when validation error 
    if (err instanceof mongoose.Error.ValidationError) {
        errorResponseMessage = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err.errors
            }
        };
    };

    // If error cause when validator 
    if (err instanceof mongoose.Error.ValidatorError) {
        errorResponseMessage = {
            message: 'Validator failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err
            }
        };
    };

    // If error cause when case error 
    if (err instanceof mongoose.Error.CastError) {
        errorResponseMessage = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                message: err.message,
                errors: err
            }
        };
    };

    // send error message 
    const errorStatusCode = err.statusCode || 404;
    res.status(errorStatusCode).send(errorResponseMessage);

};