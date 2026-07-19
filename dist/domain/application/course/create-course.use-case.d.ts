import { CourseEntity } from "@domain/models/entities/course.entity";
import { CreateCoursePort } from "@ports/in/course/create-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class CreateCourseUseCase implements CreateCoursePort {
    private readonly coursePersistencePort;
    constructor(coursePersistencePort: CoursePersistencePort);
    createCourse(course: CourseEntity): Promise<CourseEntity>;
}
