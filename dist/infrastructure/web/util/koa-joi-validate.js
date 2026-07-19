"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const joi_1 = __importDefault(require("joi"));
const status_codes_1 = require("@common/web/status-codes");
function validateObject(object = {}, label, schema, options) {
    if (schema) {
        const { error } = schema.validate(object, options);
        if (error) {
            throw new Error(`Invalid ${label} - ${error.message}`);
        }
    }
}
function validateRequest(validationObj) {
    return async (ctx, next) => {
        try {
            validateObject(ctx.headers, 'Headers', joi_1.default.object().keys(validationObj.headers), {
                allowUnknown: true,
            });
            validateObject(ctx.params, 'URL Parameters', joi_1.default.object().keys(validationObj.params));
            validateObject(ctx.query, 'URL Query', joi_1.default.object().keys(validationObj.query));
            if (validationObj.cookies) {
                validateObject(ctx.cookie || {}, 'Cookies', joi_1.default.object().keys(validationObj.cookies));
            }
            if (ctx.request.body) {
                validateObject(ctx.request.body, 'Request Body', joi_1.default.object().keys(validationObj.body));
            }
            return next();
        }
        catch (error) {
            ctx.status = status_codes_1.STATUS_CODES.BAD_REQUEST;
            ctx.body = {
                message: 'Validation error',
                details: error.message,
            };
            ctx.status = status_codes_1.STATUS_CODES.BAD_REQUEST;
            ctx.body = {
                message: 'Validation error',
                details: error instanceof Error ? error.message : 'Unknown error',
            };
            return;
        }
    };
}
