export interface CreateReviewPort {
    createReview(userId: string, courseId: string, rating: number, comment?: string): Promise<void>;
}
