import { BaseListResponse, BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { CourseParams, CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class CourseRepository implements CoursePersistencePort {
    private toPersistence;
    private toDomain;
    create(course: CourseEntity): Promise<CourseEntity>;
    update(course: CourseEntity): Promise<BaseResponse>;
    findById(courseId: string): Promise<CourseEntity | null>;
    findAll(params?: CourseParams): Promise<BaseListResponse<CourseEntity>>;
    delete(courseId: string): Promise<BaseResponse>;
}
