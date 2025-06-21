import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };

    /* if (err instanceof mongoose.Error.ValidationError) {
        errorResponseMessage = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: {}
            }
        };
        if (err instanceof mongoose.Error.CastError) {
            errorResponseMessage = {
                message: 'Case Error',
                success: false,
                error: {
                    name: err,
                    errors: {}
                }
            };

            for (const field in err) {
                const fieldError = err.errors[field] as mongoose.Error.CastError;
                errorResponseMessage.error.errors[field] = {
                    message: fieldError.message,
                    name: fieldError.name,
                    kind: fieldError.kind,
                    path: fieldError.path,
                    value: fieldError.value,
                    reason: fieldError.reason,
                };
            }
        }
        console.log(errr, errr3)
    } */
    res.status(err.statusCode || 500).send(errorResponseMessage)
};