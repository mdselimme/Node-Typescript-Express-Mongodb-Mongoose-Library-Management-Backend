"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errorResponseMessage = {
        message: err.message,
        success: false,
        error: err
    };
    res.status(err.statusCode || 500).send(errorResponseMessage);
};
exports.errorHandler = errorHandler;
