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
exports.ChargeCardUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const user_card_entity_1 = require("@domain/models/entities/user-card.entity");
const logger_1 = require("@infrastructure/web/util/logger");
let ChargeCardUseCase = class ChargeCardUseCase {
    constructor(paystackPaymentPort, userCardPersistencePort) {
        this.paystackPaymentPort = paystackPaymentPort;
        this.userCardPersistencePort = userCardPersistencePort;
    }
    async chargeCard(userId, email, cardDetails, amount, courseId) {
        try {
            const metadata = { userId, courseId };
            let response;
            if (cardDetails.authorization_code) {
                response = await this.paystackPaymentPort.chargeAuthorization(cardDetails.authorization_code, email, amount, metadata);
            }
            else {
                response = await this.paystackPaymentPort.chargeCard(cardDetails, email, amount, metadata);
            }
            if (!cardDetails.authorization_code && response.status === true && response.data?.status === 'success') {
                const authorization = response.data.authorization;
                if (authorization && authorization.authorization_code) {
                    const userCard = new user_card_entity_1.UserCardEntity(userId, authorization.authorization_code, authorization.last4, authorization.brand || authorization.card_type, parseInt(authorization.exp_month), parseInt(authorization.exp_year), true);
                    await this.userCardPersistencePort.save(userCard);
                }
            }
            return response;
        }
        catch (error) {
            logger_1.logger.error(`Error in ChargeCardUseCase for user ${userId}:`, error);
            throw new Error(`Charge failed: ${error.message}`);
        }
    }
};
exports.ChargeCardUseCase = ChargeCardUseCase;
exports.ChargeCardUseCase = ChargeCardUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)("PaystackPaymentPort")),
    __param(1, (0, tsyringe_1.inject)("UserCardPersistencePort")),
    __metadata("design:paramtypes", [Object, Object])
], ChargeCardUseCase);
