import { BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";

export interface UpdateCoursePort {
    updateCourse(course: CourseEntity): Promise<BaseResponse>;
}
