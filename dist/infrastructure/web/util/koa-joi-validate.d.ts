import { IMiddleware } from 'koa-router';
import Joi from 'joi';
export declare function validateRequest(validationObj: ValidationObj): IMiddleware;
interface ValidationObj {
    readonly headers?: Record<string, Joi.SchemaLike>;
    readonly params?: Record<string, Joi.SchemaLike>;
    readonly query?: Record<string, Joi.SchemaLike>;
    readonly body?: Record<string, Joi.SchemaLike>;
    readonly cookies?: Record<string, Joi.SchemaLike>;
}
export {};
