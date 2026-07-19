import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindNextLessonPort } from "@ports/in/lesson/find-next-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class FindNextLessonUseCase implements FindNextLessonPort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    findNextLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
}
