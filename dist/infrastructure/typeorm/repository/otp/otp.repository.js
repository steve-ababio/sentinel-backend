"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const enum_1 = require("@common/auth/enum");
const otp_entity_1 = require("@domain/models/entities/otp.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const otp_entity_2 = require("@infrastructure/typeorm/entities/otp/otp.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const tsyringe_1 = require("tsyringe");
let OtpRepository = class OtpRepository {
    toPersistence(domain) {
        const model = new otp_entity_2.Otp();
        if (domain.id)
            model.id = domain.id;
        if (domain.identifier)
            model.identifier = domain.identifier;
        if (domain.identifierType)
            model.identifierType = domain.identifierType;
        if (domain.status)
            model.status = domain.status;
        if (domain.expiresAt)
            model.expiresAt = domain.expiresAt;
        if (domain.code)
            model.code = domain.code;
        if (domain.attempts !== undefined)
            model.attempts = domain.attempts;
        if (domain.userId) {
            const user = new user_entity_1.User();
            user.id = domain.userId;
            model.user = user;
        }
        return model;
    }
    toDomain(model) {
        return new otp_entity_1.OtpEntity(model.user?.id || null, model.identifier, model.identifierType, model.status, model.expiresAt, model.code, model.attempts, model.id);
    }
    async save(payload) {
        await data_source_1.manager.save(otp_entity_2.Otp, this.toPersistence(payload));
    }
    async invalidateActiveOtps(userId, identifierType) {
        await data_source_1.manager.createQueryBuilder()
            .update(otp_entity_2.Otp)
            .set({ status: enum_1.OtpStatus.EXPIRED })
            .where("user_id = :userId", { userId })
            .andWhere("identifier_type = :identifierType", { identifierType })
            .andWhere("status = :status", { status: enum_1.OtpStatus.ACTIVE })
            .execute();
    }
    async findActiveOtpByIdentifier(identifier, identifierType) {
        const otp = await data_source_1.manager.findOne(otp_entity_2.Otp, {
            where: {
                identifier,
                identifierType,
                status: enum_1.OtpStatus.ACTIVE
            },
            relations: ["user"]
        });
        if (!otp)
            return null;
        return this.toDomain(otp);
    }
    async update(id, payload) {
        const updateData = {};
        if (payload.status)
            updateData.status = payload.status;
        if (payload.attempts !== undefined)
            updateData.attempts = payload.attempts;
        await data_source_1.manager.update(otp_entity_2.Otp, { id }, updateData);
    }
};
exports.OtpRepository = OtpRepository;
exports.OtpRepository = OtpRepository = __decorate([
    (0, tsyringe_1.injectable)()
], OtpRepository);
