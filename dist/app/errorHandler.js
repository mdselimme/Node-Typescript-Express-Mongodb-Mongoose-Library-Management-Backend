"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };
    const errorStatusCode = err.statusCode || 500;
    res.status(errorStatusCode).send(errorResponseMessage);
};
exports.errorHandler = errorHandler;
