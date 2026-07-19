import { BaseResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { UpdateCoursePort } from "@ports/in/course/update-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class UpdateCourseUseCase implements UpdateCoursePort {
    private readonly coursePersistencePort;
    constructor(coursePersistencePort: CoursePersistencePort);
    updateCourse(course: CourseEntity): Promise<BaseResponse>;
}
