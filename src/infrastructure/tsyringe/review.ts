import { container } from "tsyringe";

import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
import { ReviewRepository } from "@infrastructure/typeorm/repository/review/review.repository";

import { FindReviewsByCoursePort } from "@ports/in/review/find-reviews-by-course.port";
import { FindReviewsByCourseUseCase } from "@domain/application/review/find-reviews-by-course.use-case";

import { GetCourseReviewStatsPort } from "@ports/in/review/get-course-review-stats.port";
import { GetCourseReviewStatsUseCase } from "@domain/application/review/get-course-review-stats.use-case";

import { CreateReviewPort } from "@ports/in/review/create-review.port";
import { CreateReviewUseCase } from "@domain/application/review/create-review.use-case";

container.register<ReviewPersistencePort>("ReviewPersistencePort", {
    useClass: ReviewRepository
});

container.register<FindReviewsByCoursePort>("FindReviewsByCoursePort", {
    useClass: FindReviewsByCourseUseCase
});

container.register<GetCourseReviewStatsPort>("GetCourseReviewStatsPort", {
    useClass: GetCourseReviewStatsUseCase
});

container.register<CreateReviewPort>("CreateReviewPort", {
    useClass: CreateReviewUseCase
});
