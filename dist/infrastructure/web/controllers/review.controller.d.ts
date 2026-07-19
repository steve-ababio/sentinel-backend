import { FindReviewsByCoursePort } from "@ports/in/review/find-reviews-by-course.port";
import { GetCourseReviewStatsPort } from "@ports/in/review/get-course-review-stats.port";
import { CreateReviewPort } from "@ports/in/review/create-review.port";
export declare class ReviewController {
    private findReviewsByCoursePort;
    private getCourseReviewStatsPort;
    private createReviewPort;
    constructor(findReviewsByCoursePort: FindReviewsByCoursePort, getCourseReviewStatsPort: GetCourseReviewStatsPort, createReviewPort: CreateReviewPort);
    findReviewsByCourse(ctx: any): Promise<void>;
    getCourseReviewStats(ctx: any): Promise<void>;
    createReview(ctx: any): Promise<void>;
}
