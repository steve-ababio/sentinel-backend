"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("@infrastructure/tsyringe/container");
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const routes_1 = require("@infrastructure/web/routes");
const koa_cookie_1 = __importDefault(require("koa-cookie"));
const logger_1 = require("@infrastructure/web/util/logger");
const route_error_1 = require("@infrastructure/web/util/route-error");
const constants_1 = require("@common/auth/constants");
const koa_useragent_1 = __importDefault(require("koa-useragent"));
const koa_session_1 = __importDefault(require("koa-session"));
const logger = (0, logger_1.createLogger)('ROOT', 'KOA');
const Sentry = __importStar(require("@sentry/node"));
const app = new koa_1.default();
exports.app = app;
app.keys = [process.env.SESSION_SECRET || 'super-secret-key'];
app.use((0, koa_session_1.default)({}, app));
app.use(koa_useragent_1.default);
app.use((0, cors_1.default)({
    origin: (ctx) => {
        const validDomains = ['http://localhost:3000', process.env.FRONTEND_URL];
        if (ctx.request.header.origin && validDomains.includes(ctx.request.header.origin)) {
            return ctx.request.header.origin;
        }
        return 'http://localhost:3000';
    },
    credentials: true,
}));
app.use((0, koa_bodyparser_1.default)({ jsonLimit: '2mb' }));
app.use((0, koa_cookie_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
    try {
        if (!ctx.path.startsWith('/auth/register') && !ctx.path.startsWith('/auth/login')) {
            logger.info('Request Body:', { body: ctx.request.body, path: ctx.path });
        }
        await next();
    }
    catch (error) {
        const isClientAbort = (err) => {
            const expectedCodes = ['ECONNRESET', 'EPIPE', 'ERR_STREAM_PREMATURE_CLOSE'];
            const expectedMessages = ['Premature close', 'stream ended early'];
            return ((err.code && expectedCodes.includes(err.code)) ||
                (err.message && expectedMessages.some(msg => err.message.includes(msg))));
        };
        if (isClientAbort(error)) {
            logger.info(`Client connection aborted: ${error.message} (${ctx.method} ${ctx.url})`);
            return;
        }
        let routeError;
        if (error instanceof route_error_1.RouteError) {
            routeError = error;
        }
        else {
            Sentry.captureException(error);
            routeError = new route_error_1.RouteError(500, constants_1.MESSAGES.GENERIC_ERROR_HANDLER);
        }
        ctx.status = routeError.status;
        ctx.body = {
            error: {
                message: routeError.message,
            },
        };
        ctx.app.emit('error', error, ctx);
    }
});
app.on('error', (error, ctx) => {
    const isClientAbort = (err) => {
        const expectedCodes = ['ECONNRESET', 'EPIPE', 'ERR_STREAM_PREMATURE_CLOSE'];
        const expectedMessages = ['Premature close', 'stream ended early'];
        return ((err.code && expectedCodes.includes(err.code)) ||
            (err.message && expectedMessages.some(msg => err.message.includes(msg))));
    };
    if (isClientAbort(error)) {
        return;
    }
    logger.error('Unhandled Exception', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        ...(error instanceof route_error_1.RouteError ? { status: error.status, routeMessage: error.message } : {}),
        error, url: ctx?.url
    });
});
app.use(routes_1.router.routes());
app.use(routes_1.router.allowedMethods());
