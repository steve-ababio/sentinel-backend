import { CreateReviewPort } from "@ports/in/review/create-review.port";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
export declare class CreateReviewUseCase implements CreateReviewPort {
    private reviewPersistencePort;
    constructor(reviewPersistencePort: ReviewPersistencePort);
    createReview(userId: string, courseId: string, rating: number, comment?: string): Promise<void>;
}
