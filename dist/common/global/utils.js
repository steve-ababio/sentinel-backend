"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRouteError = handleRouteError;
const constants_1 = require("@common/auth/constants");
const status_codes_1 = require("@common/web/status-codes");
const route_error_1 = require("@infrastructure/web/util/route-error");
function handleRouteError(error, ctx, logger) {
    if (error instanceof route_error_1.RouteError) {
        ctx.status = error.status;
        ctx.body = { message: error.message, success: false };
    }
    else {
        ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
        ctx.body = {
            details: error,
            message: constants_1.MESSAGES.GENERIC_ERROR_HANDLER,
            success: false,
        };
        logger.error('error', error);
    }
}
