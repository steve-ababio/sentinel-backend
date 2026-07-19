"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const review_entity_1 = require("@domain/models/entities/review.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const review_entity_2 = require("@infrastructure/typeorm/entities/review/review.entity");
const tsyringe_1 = require("tsyringe");
const types_1 = require("@common/global/types");
const user_info_entity_1 = require("@infrastructure/typeorm/entities/user-info/user-info.entity");
let ReviewRepository = class ReviewRepository {
    toDomain(review) {
        return new review_entity_1.ReviewEntity(review.id, review.reviewer?.id, review.rating, review.entityType, review.entityId, review.comment);
    }
    async create(userId, courseId, reviewEntity) {
        const review = new review_entity_2.Review();
        const userInfo = await data_source_1.manager.findOne(user_info_entity_1.UserInfo, { where: { user: { id: userId } } });
        if (!userInfo) {
            throw new Error(`UserInfo not found for reviewer with user ID ${userId}`);
        }
        review.reviewer = userInfo;
        review.entityType = types_1.EntityType.COURSE;
        review.entityId = courseId;
        review.rating = reviewEntity.rating;
        review.comment = reviewEntity.comment || "";
        await data_source_1.manager.save(review_entity_2.Review, review);
    }
    async findByCourseId(courseId) {
        const reviews = await data_source_1.manager.find(review_entity_2.Review, {
            where: { entityId: courseId, entityType: types_1.EntityType.COURSE },
            relations: ["reviewer"],
            order: { createdAt: "DESC" }
        });
        console.log("reviews: ", reviews);
        return reviews.map(r => {
            const entity = this.toDomain(r);
            entity.reviewerName = r.reviewer ? `${r.reviewer.firstName} ${r.reviewer.lastName}`.trim() : "Anonymous";
            entity.reviewerAvatar = r.reviewer?.profilePicture || null;
            return entity;
        });
    }
    async getAverageRating(courseId) {
        const result = await data_source_1.manager.createQueryBuilder(review_entity_2.Review, "review")
            .select("AVG(review.rating)", "average")
            .where("review.entityId = :courseId", { courseId })
            .andWhere("review.entityType = :entityType", { entityType: types_1.EntityType.COURSE })
            .getRawOne();
        return result?.average ? parseFloat(Number(result.average).toFixed(1)) : 0;
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ReviewRepository);
