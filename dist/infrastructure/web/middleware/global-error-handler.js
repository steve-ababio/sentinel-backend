"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const route_error_1 = require("@infrastructure/error/route-error");
function globalErrorHandler(error, req, res, next) {
    let routeError;
    if (error instanceof route_error_1.RouteError) {
        routeError = error;
    }
    console.error("🔥 Unexpected Error:", error);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
}
