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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoUseCase = void 0;
const user_info_entity_1 = require("@domain/models/entities/user-info.entity");
const tsyringe_1 = require("tsyringe");
const enum_1 = require("@common/auth/enum");
const enum_2 = require("@common/user/enum");
let GetUserInfoUseCase = class GetUserInfoUseCase {
    constructor(userInfoPersistencePort, userPersistencePort, contactPersistencePort) {
        this.userInfoPersistencePort = userInfoPersistencePort;
        this.userPersistencePort = userPersistencePort;
        this.contactPersistencePort = contactPersistencePort;
    }
    async getUserInfo(userId) {
        const userInfo = await this.userInfoPersistencePort.findByUserId(userId);
        const user = await this.userPersistencePort.findById(userId);
        const contacts = await this.contactPersistencePort.findAllUserContacts(userId);
        const emailContact = contacts?.find(c => c.identifierType === enum_1.IdentifierType.EMAIL);
        const isEmailVerified = emailContact ? emailContact.status === enum_2.ContactStatus.VERIFIED : false;
        return new user_info_entity_1.UserInfoEntity(userId, userInfo?.firstName, userInfo?.lastName, userInfo?.phoneNumber, userInfo?.company, userInfo?.profilePicture, userInfo?.id, user?.email, isEmailVerified, user?.role);
    }
};
exports.GetUserInfoUseCase = GetUserInfoUseCase;
exports.GetUserInfoUseCase = GetUserInfoUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserInfoPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('UserPersistencePort')),
    __param(2, (0, tsyringe_1.inject)('ContactPersistencePort')),
    __metadata("design:paramtypes", [Object, Object, Object])
], GetUserInfoUseCase);
