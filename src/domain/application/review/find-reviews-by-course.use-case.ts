import { inject, injectable } from "tsyringe";
import { ReviewEntity } from "@domain/models/entities/review.entity";
import { FindReviewsByCoursePort } from "@ports/in/review/find-reviews-by-course.port";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";

@injectable()
export class FindReviewsByCourseUseCase implements FindReviewsByCoursePort {
    constructor(
        @inject("ReviewPersistencePort")
        private reviewPersistencePort: ReviewPersistencePort
    ) {}

    async findReviewsByCourse(courseId: string): Promise<ReviewEntity[]> {
        return this.reviewPersistencePort.findByCourseId(courseId);
    }
}
