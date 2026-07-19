"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteError = void 0;
class RouteError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.RouteError = RouteError;
