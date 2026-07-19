"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const review_repository_1 = require("@infrastructure/typeorm/repository/review/review.repository");
const find_reviews_by_course_use_case_1 = require("@domain/application/review/find-reviews-by-course.use-case");
const get_course_review_stats_use_case_1 = require("@domain/application/review/get-course-review-stats.use-case");
const create_review_use_case_1 = require("@domain/application/review/create-review.use-case");
tsyringe_1.container.register("ReviewPersistencePort", {
    useClass: review_repository_1.ReviewRepository
});
tsyringe_1.container.register("FindReviewsByCoursePort", {
    useClass: find_reviews_by_course_use_case_1.FindReviewsByCourseUseCase
});
tsyringe_1.container.register("GetCourseReviewStatsPort", {
    useClass: get_course_review_stats_use_case_1.GetCourseReviewStatsUseCase
});
tsyringe_1.container.register("CreateReviewPort", {
    useClass: create_review_use_case_1.CreateReviewUseCase
});
