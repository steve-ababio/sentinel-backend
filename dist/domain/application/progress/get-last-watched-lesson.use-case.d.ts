import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { GetLastWatchedLessonPort } from "@ports/in/progress/get-last-watched-lesson.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
export declare class GetLastWatchedLessonUseCase implements GetLastWatchedLessonPort {
    private readonly progressPersistencePort;
    constructor(progressPersistencePort: ProgressPersistencePort);
    getLastWatchedLesson(userId: string, courseId: string): Promise<LessonEntity | null>;
}
