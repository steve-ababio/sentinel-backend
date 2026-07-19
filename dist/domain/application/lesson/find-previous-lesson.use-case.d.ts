import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindPreviousLessonPort } from "@ports/in/lesson/find-previous-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class FindPreviousLessonUseCase implements FindPreviousLessonPort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    findPreviousLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
}
