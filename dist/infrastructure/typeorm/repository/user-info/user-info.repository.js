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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoRepository = void 0;
const tsyringe_1 = require("tsyringe");
const user_info_entity_1 = require("@domain/models/entities/user-info.entity");
const user_info_entity_2 = require("@infrastructure/typeorm/entities/user-info/user-info.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
let UserInfoRepository = class UserInfoRepository {
    constructor() { }
    toPersistence(userInfo, user) {
        const userInfoModel = new user_info_entity_2.UserInfo();
        userInfoModel.user = user;
        if (userInfo.firstName !== undefined)
            userInfoModel.firstName = userInfo.firstName;
        if (userInfo.lastName !== undefined)
            userInfoModel.lastName = userInfo.lastName;
        if (userInfo.phoneNumber !== undefined)
            userInfoModel.phoneNumber = userInfo.phoneNumber;
        if (userInfo.company !== undefined)
            userInfoModel.company = userInfo.company;
        if (userInfo.profilePicture !== undefined)
            userInfoModel.profilePicture = userInfo.profilePicture;
        return userInfoModel;
    }
    toDomain(userInfo) {
        return new user_info_entity_1.UserInfoEntity(userInfo.user.id, userInfo.firstName, userInfo.lastName, userInfo.phoneNumber, userInfo.company, userInfo.profilePicture, userInfo.id);
    }
    async create(userInfo) {
        const user = new user_entity_1.User();
        user.id = userInfo.userId;
        const userInfoEntity = await data_source_1.manager.save(user_info_entity_2.UserInfo, this.toPersistence(userInfo, user));
        return this.toDomain(userInfoEntity);
    }
    async findById(userId) {
        const userInfo = await data_source_1.manager.findOne(user_info_entity_2.UserInfo, { where: { user: { id: userId } }, relations: ['user'] });
        if (!userInfo)
            return null;
        return this.toDomain(userInfo);
    }
    async findByUserId(userId) {
        const userInfo = await data_source_1.manager.findOne(user_info_entity_2.UserInfo, { where: { user: { id: userId } }, relations: ['user'] });
        if (!userInfo)
            return null;
        return this.toDomain(userInfo);
    }
    async update(userInfo) {
        const user = new user_entity_1.User();
        user.id = userInfo.userId;
        const updateResult = await data_source_1.manager.update(user_info_entity_2.UserInfo, { user: { id: userInfo.userId } }, this.toPersistence(userInfo, user));
        const affected = updateResult.affected;
        if (affected > 0) {
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
};
exports.UserInfoRepository = UserInfoRepository;
exports.UserInfoRepository = UserInfoRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserInfoRepository);
