"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressEntity = void 0;
class ProgressEntity {
    constructor(completed, lastPosition, userId, lessonId) {
        this.completed = completed;
        this.lastPosition = lastPosition;
        this.userId = userId;
        this.lessonId = lessonId;
    }
}
exports.ProgressEntity = ProgressEntity;
