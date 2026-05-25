import { ReviewEntity } from "@domain/models/entities/review.entity";
import { ReviewPersistencePort } from "@ports/out/persistence/review.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Review } from "@infrastructure/typeorm/entities/review/review.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { injectable } from "tsyringe";
import { EntityType } from "@common/global/types";
import { UserInfo } from "@infrastructure/typeorm/entities/user-info/user-info.entity";

@injectable()
export class ReviewRepository implements ReviewPersistencePort {
    
    private toDomain(review: Review): ReviewEntity {
        return new ReviewEntity(
            review.id,
            review.reviewer?.user.id,
            review.rating,
            review.entityType,
            review.entityId,
            review.comment
        );
    }

    async create(userId: string, courseId: string, reviewEntity: ReviewEntity): Promise<void> {
        const review = new Review();
        
        const userInfo = new UserInfo();
        userInfo.user.id = userId;
        review.reviewer = userInfo;
        
        review.entityType = EntityType.COURSE;
        review.entityId = courseId;
        review.rating = reviewEntity.rating;
        review.comment = reviewEntity.comment || "";
        
        await manager.save(Review, review);
    }

    async findByCourseId(courseId: string): Promise<ReviewEntity[]> {
        const reviews = await manager.find(Review, {
            where: { entityId: courseId, entityType: EntityType.COURSE },
            relations: ["reviewer"],
            order: { createdAt: "DESC" }
        });
        
        return reviews.map(r => {
            const entity = this.toDomain(r);
            // Optionally attach the reviewer name for the frontend
            (entity as any).reviewerName = r.reviewer ? `${r.reviewer.firstName} ${r.reviewer.lastName}`.trim() : "Anonymous";
            (entity as any).reviewerAvatar = r.reviewer?.profilePicture || null;
            return entity;
        });
    }

    async getAverageRating(courseId: string): Promise<number> {
        const result = await manager.createQueryBuilder(Review, "review")
            .select("AVG(review.rating)", "average")
            .where("review.entityId = :courseId", { courseId })
            .andWhere("review.entityType = :entityType", { entityType: EntityType.COURSE })
            .getRawOne();
            
        return result?.average ? parseFloat(Number(result.average).toFixed(1)) : 0;
    }
}
