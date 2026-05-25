import { inject, injectable } from "tsyringe";
import { GetCourseReviewStatsPort } from "@ports/in/review/get-course-review-stats.port";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";

@injectable()
export class GetCourseReviewStatsUseCase implements GetCourseReviewStatsPort {
    constructor(
        @inject("ReviewPersistencePort")
        private reviewPersistencePort: ReviewPersistencePort
    ) {}

    async getCourseReviewStats(courseId: string): Promise<{ averageRating: number, totalReviews: number }> {
        const reviews = await this.reviewPersistencePort.findByCourseId(courseId);
        const totalReviews = reviews.length;
        const averageRating = await this.reviewPersistencePort.getAverageRating(courseId);
        
        return {
            averageRating,
            totalReviews
        };
    }
}
