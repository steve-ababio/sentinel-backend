import { BaseListResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { CourseParams } from "@ports/out/persistence/course.persistence";

export interface FindAllCoursesPort {
    findAllCourses(params?: CourseParams): Promise<BaseListResponse<CourseEntity>>;
}
