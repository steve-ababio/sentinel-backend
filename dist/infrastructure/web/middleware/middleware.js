"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = exports.JwtMiddleware = exports.getJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const enum_1 = require("@common/auth/enum");
const logger_1 = require("../util/logger");
const types_1 = require("@common/global/types");
const getJwtToken = (ctx) => {
    let token = ctx.cookies.get('accessToken');
    return token;
};
exports.getJwtToken = getJwtToken;
let JwtMiddleware = class JwtMiddleware {
    constructor(sessionActivityPersistence, userPersistence) {
        this.sessionActivityPersistence = sessionActivityPersistence;
        this.userPersistence = userPersistence;
    }
    async jwtMiddleware(ctx, next) {
        const token = (0, exports.getJwtToken)(ctx);
        if (!token) {
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
            return;
        }
        try {
            const secretKey = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            const { sessionId, id } = decoded;
            const session = await this.sessionActivityPersistence.findById(sessionId);
            if (!session || session?.status === enum_1.AccountSessionStatus.EXPIRED) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }
            const user = await this.userPersistence.findById(id);
            if (!user) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }
            ctx.state.jwtPayload = decoded;
            ctx.state.user = user;
            await this.sessionActivityPersistence.invalidateActiveSessions(id, sessionId);
            await next();
        }
        catch (err) {
            logger_1.logger.error(err);
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
        }
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AccountSessionActivityPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('UserPersistencePort')),
    __metadata("design:paramtypes", [Object, Object])
], JwtMiddleware);
let AdminMiddleware = class AdminMiddleware {
    async adminGuard(ctx, next) {
        const user = ctx.state.user;
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
            return;
        }
        const isAdmin = user.role === types_1.UserRole.ADMIN;
        if (!isAdmin) {
            ctx.status = 403;
            ctx.body = { message: 'Access denied: Administrator role required' };
            return;
        }
        await next();
    }
};
exports.AdminMiddleware = AdminMiddleware;
exports.AdminMiddleware = AdminMiddleware = __decorate([
    (0, tsyringe_1.injectable)()
], AdminMiddleware);
