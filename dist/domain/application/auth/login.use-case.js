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
exports.LoginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const enum_1 = require("@common/auth/enum");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("@infrastructure/web/util/logger");
const status_codes_1 = require("@common/web/status-codes");
const constants_1 = require("@common/auth/constants");
const route_error_1 = require("@infrastructure/web/util/route-error");
const logger = (0, logger_1.createLogger)('USE_CASE', 'LOGIN');
let LoginUseCase = class LoginUseCase {
    constructor(userPersistence) {
        this.userPersistence = userPersistence;
    }
    async login(loginPortOptions) {
        const { socialChannel, socialChannelId, email, password } = loginPortOptions;
        let existingUser;
        if (socialChannel !== enum_1.SocialChannel.NONE) {
            existingUser = await this.userPersistence.findBySocialChannelId(socialChannelId);
            if (!existingUser) {
                logger.warn(`Login attempt with non-existing socialChannelId: ${socialChannelId}`);
                throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.UNAUTHORIZED, constants_1.AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
            }
        }
        else {
            existingUser = await this.userPersistence.findByEmail(email);
            if (!existingUser) {
                logger.warn(`Login attempt with non-existing email: ${email}`);
                throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.UNAUTHORIZED, constants_1.AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
            }
            const isValidPassword = await this.isValidPassword(password, existingUser.password);
            if (!isValidPassword) {
                logger.warn(`Invalid password attempt for user: ${existingUser.id}`);
                throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.UNAUTHORIZED, constants_1.AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
            }
            logger.info(`Password validated for user: ${existingUser.id}`);
        }
        logger.info(`User logged in: ${existingUser.id}`);
        return { user: existingUser };
    }
    async isValidPassword(password, hashedPassword) {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)('UserPersistencePort')),
    __metadata("design:paramtypes", [Object])
], LoginUseCase);
