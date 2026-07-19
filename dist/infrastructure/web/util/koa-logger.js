"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = logRequest;
const logger_1 = require("./logger");
function logRequest() {
    return async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        let logLevel;
        switch (Math.floor(ctx.status / 100) * 100) {
            case 400:
                logLevel = 'warn';
                break;
            case 500:
                logLevel = 'error';
                break;
            default:
                logLevel = 'info';
                break;
        }
        const userId = ctx.state.jwtPayload ? ctx.state.jwtPayload.accountId : 'Not Authenticated';
        const deviceId = ctx.state.deviceId || 'Unknown Device Id';
        const cfHeaders = {
            ip: ctx.request.get('CF-Connecting-IP'),
            ipsForwarded: ctx.request.get('X-Forwarded-For'),
            country: ctx.request.get('Cf-Ipcountry'),
            ray: ctx.request.get('Cf-Ray'),
            visitor: ctx.request.get('Cf-Visitor'),
        };
        const message = {
            METHOD: ctx.method,
            URL: ctx.originalUrl,
            IP: cfHeaders.ip || ctx.ip,
            IPS_FORWARDED: cfHeaders.ipsForwarded || ctx.ips,
            CF_COUNTRY: cfHeaders.country,
            CF_RAY: cfHeaders.ray,
            USER: userId,
            DEVICE: deviceId,
            LATENCY: ms,
            STATUS: ctx.status,
        };
        logger_1.logger[logLevel](message);
    };
}
