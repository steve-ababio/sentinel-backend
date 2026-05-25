import { ReviewEntity } from "@domain/models/entities/review.entity";

export interface FindReviewsByCoursePort {
    findReviewsByCourse(courseId: string): Promise<ReviewEntity[]>;
}
