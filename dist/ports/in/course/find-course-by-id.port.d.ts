import { CourseEntity } from "@domain/models/entities/course.entity";
export interface FindCourseByIdPort {
    findCourseById(courseId: string): Promise<CourseEntity | null>;
}
