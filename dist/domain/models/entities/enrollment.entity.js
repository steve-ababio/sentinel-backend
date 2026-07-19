"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentEntity = void 0;
class EnrollmentEntity {
    constructor(enrollmentStatus, userId, courseId, id, course) {
        this.enrollmentStatus = enrollmentStatus;
        this.userId = userId;
        this.courseId = courseId;
        this.id = id;
        this.course = course;
    }
}
exports.EnrollmentEntity = EnrollmentEntity;
