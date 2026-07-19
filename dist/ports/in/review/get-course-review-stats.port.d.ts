export interface GetCourseReviewStatsPort {
    getCourseReviewStats(courseId: string): Promise<{
        averageRating: number;
        totalReviews: number;
    }>;
}
