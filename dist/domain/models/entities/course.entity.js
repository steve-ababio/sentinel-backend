"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEntity = void 0;
class CourseEntity {
    constructor(title, description, thumbnail, isPopular, skillsGained, provider, expectedExperience, approvalRate, languages, price, pricingModel, enrolledCount, specialization, progress, difficulty, reviews, id, instructor, instructorId) {
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.isPopular = isPopular;
        this.skillsGained = skillsGained;
        this.provider = provider;
        this.expectedExperience = expectedExperience;
        this.approvalRate = approvalRate;
        this.languages = languages;
        this.price = price;
        this.pricingModel = pricingModel;
        this.enrolledCount = enrolledCount;
        this.specialization = specialization;
        this.progress = progress;
        this.difficulty = difficulty;
        this.reviews = reviews;
        this.id = id;
        this.instructor = instructor;
        this.instructorId = instructorId;
    }
}
exports.CourseEntity = CourseEntity;
