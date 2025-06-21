import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };
    const errorStatusCode = err.statusCode || 500;
    res.status(errorStatusCode).send(errorResponseMessage);
};