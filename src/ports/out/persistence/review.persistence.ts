import { ReviewEntity } from "@domain/models/entities/review.entity";

export interface ReviewPersistencePort {
    create(userId: string,courseId: string,review:ReviewEntity): Promise<void>;
    findByCourseId(courseId: string): Promise<ReviewEntity[]>;
    getAverageRating(courseId: string): Promise<number>;
}