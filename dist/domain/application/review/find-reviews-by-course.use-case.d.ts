import { ReviewEntity } from "@domain/models/entities/review.entity";
import { FindReviewsByCoursePort } from "@ports/in/review/find-reviews-by-course.port";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
export declare class FindReviewsByCourseUseCase implements FindReviewsByCoursePort {
    private reviewPersistencePort;
    constructor(reviewPersistencePort: ReviewPersistencePort);
    findReviewsByCourse(courseId: string): Promise<ReviewEntity[]>;
}
