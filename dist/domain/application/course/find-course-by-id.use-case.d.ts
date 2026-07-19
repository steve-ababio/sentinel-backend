import { CourseEntity } from "@domain/models/entities/course.entity";
import { FindCourseByIdPort } from "@ports/in/course/find-course-by-id.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class FindCourseByIdUseCase implements FindCourseByIdPort {
    private readonly coursePersistencePort;
    constructor(coursePersistencePort: CoursePersistencePort);
    findCourseById(courseId: string): Promise<CourseEntity | null>;
}
