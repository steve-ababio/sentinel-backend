"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSessionActivityRepository = void 0;
const enum_1 = require("@common/auth/enum");
const account_session_activity_entity_1 = require("@domain/models/entities/account-session-activity.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const account_session_activity_entity_2 = require("@infrastructure/typeorm/entities/account-session-activity/account-session-activity.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const tsyringe_1 = require("tsyringe");
let AccountSessionActivityRepository = class AccountSessionActivityRepository {
    toPersistence(domain) {
        const model = new account_session_activity_entity_2.AccountSessionActivity();
        if (domain.id)
            model.id = domain.id;
        const user = new user_entity_1.User();
        user.id = domain.userId;
        model.user = user;
        model.deviceType = domain.deviceType;
        model.os = domain.os;
        model.status = domain.status;
        return model;
    }
    toDomain(model) {
        return new account_session_activity_entity_1.AccountSessionActivityEntity(model.user?.id || "", model.deviceType, model.os, model.status, model.id);
    }
    async cretateaccountSessionActivity(accountSessionActivity) {
        const saved = await data_source_1.manager.save(account_session_activity_entity_2.AccountSessionActivity, this.toPersistence(accountSessionActivity));
        return saved.id;
    }
    async updateSessionActivityStatusById(sessionId, status) {
        try {
            const result = await data_source_1.manager.update(account_session_activity_entity_2.AccountSessionActivity, { id: sessionId }, { status });
            if (result.affected === 0)
                return { success: false, message: "Session not found" };
            return { success: true, message: "Session status updated successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findById(id) {
        const model = await data_source_1.manager.findOne(account_session_activity_entity_2.AccountSessionActivity, {
            where: { id },
            relations: ["user"]
        });
        if (!model)
            return null;
        return this.toDomain(model);
    }
    async invalidateActiveSessions(userId, currentSessionId) {
        const query = data_source_1.manager.createQueryBuilder()
            .update(account_session_activity_entity_2.AccountSessionActivity)
            .set({ status: enum_1.AccountSessionStatus.EXPIRED })
            .where("userId = :userId", { userId })
            .andWhere("status = :status", { status: enum_1.AccountSessionStatus.ACTIVE });
        if (currentSessionId) {
            query.andWhere("id != :currentSessionId", { currentSessionId });
        }
        await query.execute();
    }
};
exports.AccountSessionActivityRepository = AccountSessionActivityRepository;
exports.AccountSessionActivityRepository = AccountSessionActivityRepository = __decorate([
    (0, tsyringe_1.injectable)()
], AccountSessionActivityRepository);
