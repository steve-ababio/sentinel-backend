import { ReviewEntity } from "@domain/models/entities/review.entity";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
export declare class ReviewRepository implements ReviewPersistencePort {
    private toDomain;
    create(userId: string, courseId: string, reviewEntity: ReviewEntity): Promise<void>;
    findByCourseId(courseId: string): Promise<ReviewEntity[]>;
    getAverageRating(courseId: string): Promise<number>;
}
