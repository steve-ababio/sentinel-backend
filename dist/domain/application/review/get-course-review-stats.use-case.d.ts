import { GetCourseReviewStatsPort } from "@ports/in/review/get-course-review-stats.port";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
export declare class GetCourseReviewStatsUseCase implements GetCourseReviewStatsPort {
    private reviewPersistencePort;
    constructor(reviewPersistencePort: ReviewPersistencePort);
    getCourseReviewStats(courseId: string): Promise<{
        averageRating: number;
        totalReviews: number;
    }>;
}
