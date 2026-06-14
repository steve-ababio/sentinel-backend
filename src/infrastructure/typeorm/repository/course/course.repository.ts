import { BaseListResponse, BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { CourseParams, CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { injectable } from "tsyringe";
import { EntityType } from "@common/global/types";
import { Review } from "@infrastructure/typeorm/entities/review/review.entity";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { Instructor } from "@infrastructure/typeorm/entities/instructor/instructor.entity";

@injectable()
export class CourseRepository implements CoursePersistencePort {

    private toPersistence(course: CourseEntity): Course {
        const courseModel = new Course();
        if(course.id) courseModel.id = course.id;
        if(course.title !== undefined || course.title !== null) courseModel.title = course.title;
        if(course.description !== undefined || course.description !== null)courseModel.description = course.description;
        if(course.thumbnail !== undefined || course.thumbnail !== null)courseModel.thumbnail = course.thumbnail;
        if(course.isPopular !== undefined || course.isPopular !== null)courseModel.isPopular = course.isPopular;

        if(course.provider !== undefined || course.provider !== null)courseModel.provider = course.provider;
        if(course.approvalRate !== undefined || course.approvalRate !== null)courseModel.approvalRate = course.approvalRate;
        if(course.difficulty !== undefined || course.difficulty !== null)courseModel.difficulty = course.difficulty;
        if(course.price !== undefined || course.price !== null)courseModel.price = course.price;
        if(course.enrolledCount !== undefined || course.enrolledCount ) courseModel.enrolledCount = course.enrolledCount;
        if(course.enrolledCount !== undefined || course.enrolledCount !== null)courseModel.enrolledCount = course.enrolledCount;
        if(course.languages)courseModel.languages = course.languages;
        if(course.specialization)courseModel.specialization = course.specialization;
        if(course.pricingModel)courseModel.pricingModel = course.pricingModel;
        if(course.expectedExperience)courseModel.expectedExperience = course.expectedExperience;
        if(course.skillsGained)courseModel.skillsGained = course.skillsGained;
        
        if (course.instructorId) {
            const inst = new Instructor();
            inst.id = course.instructorId;
            courseModel.instructor = inst;
        }
        return courseModel;
    }

    private toDomain(course: Course): CourseEntity {
        let instructorEntity: InstructorEntity | null = null;
        
        if (course.instructor) {
            instructorEntity = new InstructorEntity(
                course.instructor.email,
                course.instructor.firstName,
                course.instructor.lastName,
                course.instructor.profilePicture,
                course.instructor.role,
                course.instructor.specialization,
                course.instructor.phoneNumber,
                course.instructor.bio,
                course.instructor.id,
                (course.instructor as any).averageRating,
                (course.instructor as any).reviewCount
            );
        }
        const enrollmentCount = course.enrollments.length;
        return new CourseEntity(
            course.title,
            course.description,
            course.thumbnail,
            course.isPopular,
            course.skillsGained,
            course.provider,
            course.expectedExperience as string[],
            course.approvalRate,
            course.languages,
            course.price,
            course.pricingModel,
            enrollmentCount,
            course.specialization,
            [],
            course.difficulty,
            [],
            course.id,
            instructorEntity,
            course.instructor?.id
        );
    }

    async create(course: CourseEntity): Promise<CourseEntity> {
        const courseEntity = await manager.save(Course, this.toPersistence(course));
        return this.toDomain(courseEntity);
    }

    async update(course: CourseEntity): Promise<BaseResponse> {
        try {
            await manager.save(Course, this.toPersistence(course));
            return { success: true, message: "Course updated successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async findById(courseId: string): Promise<CourseEntity | null> {
        const courseEntity = await manager.findOne(Course, { 
            where: { id: courseId },
            relations: ["instructor","enrollments"]
        });
        
        if (!courseEntity) return null;

        if (courseEntity.instructor) {
            const instructorId = courseEntity.instructor.id;
            const stats = await manager.createQueryBuilder(Review, "review")
                .select("AVG(review.rating)", "average")
                .addSelect("COUNT(review.id)", "count")
                .where("review.entityId = :instructorId", { instructorId })
                .andWhere("review.entityType = :entityType", { entityType: EntityType.INSTRUCTOR })
                .getRawOne();
                
            (courseEntity.instructor as any).averageRating = stats?.average ? parseFloat(Number(stats.average).toFixed(1)) : 0;
            (courseEntity.instructor as any).reviewCount = stats?.count ? parseInt(stats.count) : 0;
        }

        return this.toDomain(courseEntity);
    }

    async findAll(params?: CourseParams): Promise<BaseListResponse<CourseEntity>> {
        const query = manager.getRepository(Course).createQueryBuilder("course");
        query.leftJoinAndSelect("course.enrollments","enrollments")
        if (params?.search) {
            query.andWhere("course.title ILIKE :search", { search: `%${params.search}%` });
        }
        if (params?.isPopular !== undefined) {
            query.andWhere("course.isPopular = :isPopular", { isPopular: params.isPopular });
        }
        if (params?.resultsPerPage) {
            query.take(params.resultsPerPage);
        }
        if (params?.page) {
            const limit = params.resultsPerPage || 10;
            query.skip((params.page - 1) * limit);
        }
        const totalRecords = await query.getCount();
        const courses = await query.getMany();
        return{ success: true, totalRecords: totalRecords, details: courses.map(this.toDomain)};
    }

    async delete(courseId: string): Promise<BaseResponse> {
        try {
            const result = await manager.delete(Course, courseId);
            if (result.affected === 0) return { success: false, message: "Course not found" };
            return { success: true, message: "Course deleted successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}
