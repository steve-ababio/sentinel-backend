import { CountLessonsByCoursePort } from "@ports/in/lesson/count-lessons-by-course.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class CountLessonsByCourseUseCase implements CountLessonsByCoursePort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    countLessonsByCourse(courseId: string): Promise<number>;
}
