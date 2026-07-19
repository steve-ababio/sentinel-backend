import { DeleteLessonPort } from "@ports/in/lesson/delete-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class DeleteLessonUseCase implements DeleteLessonPort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    deleteLesson(lessonId: string): Promise<void>;
}
