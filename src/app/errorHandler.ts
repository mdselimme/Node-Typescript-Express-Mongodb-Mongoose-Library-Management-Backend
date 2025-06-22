import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };

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


    const errorStatusCode = err.statusCode || 500;
    res.status(errorStatusCode).send(errorResponseMessage);

};