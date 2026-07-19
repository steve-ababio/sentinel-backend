"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewEntity = void 0;
class ReviewEntity {
    constructor(id, reviewerId, rating, entityType, entityId, comment) {
        this.id = id;
        this.reviewerId = reviewerId;
        this.rating = rating;
        this.entityType = entityType;
        this.entityId = entityId;
        this.comment = comment;
    }
}
exports.ReviewEntity = ReviewEntity;
