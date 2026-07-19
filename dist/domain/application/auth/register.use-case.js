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
exports.RegisterUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const enum_1 = require("@common/auth/enum");
const route_error_1 = require("@infrastructure/web/util/route-error");
const enum_2 = require("@common/user/enum");
const status_codes_1 = require("@common/web/status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("@common/auth/constants");
let RegisterUseCase = class RegisterUseCase {
    constructor(userPersistence, sendOtpPort, contactPersistence) {
        this.userPersistence = userPersistence;
        this.sendOtpPort = sendOtpPort;
        this.contactPersistence = contactPersistence;
    }
    async register({ email, socialChannelId, socialChannel, password }) {
        const existingUser = await this.userPersistence.findByEmail(email);
        if (existingUser)
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, constants_1.AUTH_MESSAGES.ACCOUNT_ASSOCIATED_EMAIL);
        let hashedPassword = null;
        if (socialChannel === enum_1.SocialChannel.NONE) {
            hashedPassword = await this.hash(password);
        }
        const newUser = await this.userPersistence.createUser({
            id: null,
            email,
            password: hashedPassword,
            socialChannel,
            socialChannelId
        });
        const isSocial = socialChannel && socialChannel !== enum_1.SocialChannel.NONE;
        await Promise.all([
            this.contactPersistence.save({
                userId: newUser.id,
                identifier: email,
                identifierType: enum_1.IdentifierType.EMAIL,
                status: isSocial ? enum_2.ContactStatus.VERIFIED : enum_2.ContactStatus.PENDING
            }),
            ...(isSocial ? [] : [this.sendOtpPort.sendOtp(email, enum_1.IdentifierType.EMAIL, newUser.id)])
        ]);
        return newUser;
    }
    async hash(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
};
exports.RegisterUseCase = RegisterUseCase;
exports.RegisterUseCase = RegisterUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('SendOtpPort')),
    __param(2, (0, tsyringe_1.inject)('ContactPersistencePort')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RegisterUseCase);
