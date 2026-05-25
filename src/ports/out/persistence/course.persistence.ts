import { BaseQueryParams, BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";

export interface CourseParams extends BaseQueryParams {
    search?: string;
    isPopular?: boolean;
}
export interface CoursePersistencePort {
    create(course: CourseEntity): Promise<CourseEntity>;
    update(course: CourseEntity): Promise<BaseResponse>;
    findById(courseId: string): Promise<CourseEntity | null>;
    findAll(params?:CourseParams): Promise<CourseEntity[]>;
    delete(courseId: string): Promise<BaseResponse>;
  }