"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("@domain/models/entities/user.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const user_entity_2 = require("@infrastructure/typeorm/entities/user/user.entity");
const tsyringe_1 = require("tsyringe");
let UserRepository = class UserRepository {
    toPersistence(user) {
        const userModel = new user_entity_2.User();
        userModel.identifier = user.email;
        userModel.password = user.password;
        userModel.socialChannel = user.socialChannel;
        userModel.socialChannelId = user.socialChannelId;
        userModel.role = user.role;
        return userModel;
    }
    toDomain(user) {
        return new user_entity_1.UserEntity(user.id, user.identifier, user.password, user.socialChannel, user.socialChannelId, null, user.role);
    }
    async findByEmail(email) {
        const userEntity = await data_source_1.manager.findOneBy(user_entity_2.User, { identifier: email });
        if (!userEntity)
            return null;
        return this.toDomain(userEntity);
    }
    async findBySocialChannelId(socialChannelId) {
        const userEntity = await data_source_1.manager.findOneBy(user_entity_2.User, { socialChannelId });
        if (!userEntity)
            return null;
        return this.toDomain(userEntity);
    }
    async createUser(user) {
        const userEntity = await data_source_1.manager.save(user_entity_2.User, this.toPersistence(user));
        return this.toDomain(userEntity);
    }
    async findById(id) {
        const userEntity = await data_source_1.manager.findOneBy(user_entity_2.User, { id: id });
        if (!userEntity)
            return null;
        return this.toDomain(userEntity);
    }
    async updateAccountAuthStatus(userId, newStatus) {
        try {
            const user = await data_source_1.manager.findOne(user_entity_2.User, { where: { id: userId } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.accountAuthStatus = newStatus;
            await data_source_1.manager.save(user);
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
    async updatePassword(userId, hashedPassword) {
        try {
            const user = await data_source_1.manager.findOne(user_entity_2.User, { where: { id: userId } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.password = hashedPassword;
            user.passwordResetDate = new Date();
            await data_source_1.manager.save(user);
            return { success: true, message: "Password updated successfully" };
        }
        catch (error) {
            return { success: false };
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)()
], UserRepository);
