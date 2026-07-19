import { BaseListResponse } from "@common/global/types";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { FindAllCoursesPort } from "@ports/in/course/find-all-courses.port";
import { CourseParams, CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class FindAllCoursesUseCase implements FindAllCoursesPort {
    private readonly coursePersistencePort;
    constructor(coursePersistencePort: CoursePersistencePort);
    findAllCourses(params?: CourseParams): Promise<BaseListResponse<CourseEntity>>;
}
