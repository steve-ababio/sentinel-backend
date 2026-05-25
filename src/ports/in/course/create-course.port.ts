import { CourseEntity } from "@domain/models/entities/course.entity";

export interface CreateCoursePort {
    createCourse(course: CourseEntity): Promise<CourseEntity>;
}
