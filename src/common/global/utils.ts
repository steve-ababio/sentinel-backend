import { MESSAGES } from "@common/auth/constants";
import { STATUS_CODES } from "@common/web/status-codes";
import { RouteError } from "@infrastructure/web/util/route-error";
import { Logger } from "winston";

export function handleRouteError(error: any, ctx: any, logger: Logger) {
    if (error instanceof RouteError) {
        ctx.status = error.status;
        ctx.body = {message: error.message, success: false};
    } else {
        ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
        ctx.body = {
            details: error,
            message: MESSAGES.GENERIC_ERROR_HANDLER,
            success: false,
        };
        logger.error('error', error);
    }
}