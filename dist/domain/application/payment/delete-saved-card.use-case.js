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
exports.DeleteSavedCardUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("@infrastructure/web/util/logger");
let DeleteSavedCardUseCase = class DeleteSavedCardUseCase {
    constructor(userCardPersistencePort) {
        this.userCardPersistencePort = userCardPersistencePort;
    }
    async deleteSavedCard(id, userId) {
        try {
            await this.userCardPersistencePort.delete(id, userId);
        }
        catch (error) {
            logger_1.logger.error(`Error in DeleteSavedCardUseCase for card ${id} and user ${userId}:`, error);
            throw new Error(`Failed to delete saved card: ${error.message}`);
        }
    }
};
exports.DeleteSavedCardUseCase = DeleteSavedCardUseCase;
exports.DeleteSavedCardUseCase = DeleteSavedCardUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)("UserCardPersistencePort")),
    __metadata("design:paramtypes", [Object])
], DeleteSavedCardUseCase);
