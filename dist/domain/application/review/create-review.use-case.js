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
exports.CreateReviewUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const review_entity_1 = require("@domain/models/entities/review.entity");
const types_1 = require("@common/global/types");
let CreateReviewUseCase = class CreateReviewUseCase {
    constructor(reviewPersistencePort) {
        this.reviewPersistencePort = reviewPersistencePort;
    }
    async createReview(userId, courseId, rating, comment) {
        const reviewEntity = new review_entity_1.ReviewEntity("", userId, rating, types_1.EntityType.COURSE, courseId, comment || "");
        return this.reviewPersistencePort.create(userId, courseId, reviewEntity);
    }
};
exports.CreateReviewUseCase = CreateReviewUseCase;
exports.CreateReviewUseCase = CreateReviewUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ReviewPersistencePort")),
    __metadata("design:paramtypes", [Object])
], CreateReviewUseCase);
