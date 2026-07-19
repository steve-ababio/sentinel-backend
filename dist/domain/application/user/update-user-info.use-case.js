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
exports.UpdateUserInfoUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const route_error_1 = require("@infrastructure/web/util/route-error");
const status_codes_1 = require("@common/web/status-codes");
const constants_1 = require("@common/user/constants");
let UpdateUserInfoUseCase = class UpdateUserInfoUseCase {
    constructor(userInfoPersistencePort) {
        this.userInfoPersistencePort = userInfoPersistencePort;
    }
    async updateUserInfo(userInfo) {
        const { id } = userInfo;
        const userInfoEntity = await this.userInfoPersistencePort.findById(id);
        if (!userInfoEntity)
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.NOT_FOUND, constants_1.USER_MESSAGES.USER_INFO_NOT_FOUND);
        return await this.userInfoPersistencePort.update(userInfo);
    }
};
exports.UpdateUserInfoUseCase = UpdateUserInfoUseCase;
exports.UpdateUserInfoUseCase = UpdateUserInfoUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserInfoPersistencePort')),
    __metadata("design:paramtypes", [Object])
], UpdateUserInfoUseCase);
