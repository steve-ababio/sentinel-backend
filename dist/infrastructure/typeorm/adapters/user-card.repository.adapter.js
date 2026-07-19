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
exports.UserCardRepositoryAdapter = void 0;
const tsyringe_1 = require("tsyringe");
const data_source_1 = require("../data-source");
const user_card_entity_1 = require("../entities/user-card/user-card.entity");
const user_card_entity_2 = require("@domain/models/entities/user-card.entity");
let UserCardRepositoryAdapter = class UserCardRepositoryAdapter {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(user_card_entity_1.UserCard);
    }
    toDomain(entity) {
        return new user_card_entity_2.UserCardEntity(entity.user?.id, entity.cardToken, entity.last4, entity.brand, entity.expMonth, entity.expYear, entity.isDefault, entity.id);
    }
    toEntity(domain) {
        const entity = new user_card_entity_1.UserCard();
        if (domain.id)
            entity.id = domain.id;
        entity.user = { id: domain.userId };
        entity.cardToken = domain.cardToken;
        entity.last4 = domain.last4;
        entity.brand = domain.brand;
        entity.expMonth = domain.expMonth;
        entity.expYear = domain.expYear;
        entity.isDefault = domain.isDefault;
        return entity;
    }
    async save(userCard) {
        const entity = this.toEntity(userCard);
        const savedEntity = await this.repository.save(entity);
        savedEntity.user = { id: userCard.userId };
        return this.toDomain(savedEntity);
    }
    async findByUserId(userId) {
        const entities = await this.repository.find({
            where: { user: { id: userId } },
            relations: ['user']
        });
        return entities.map(e => this.toDomain(e));
    }
};
exports.UserCardRepositoryAdapter = UserCardRepositoryAdapter;
exports.UserCardRepositoryAdapter = UserCardRepositoryAdapter = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserCardRepositoryAdapter);
