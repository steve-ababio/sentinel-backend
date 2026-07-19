import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { FindProgressByLessonPort } from "@ports/in/progress/find-progress-by-lesson.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
export declare class FindProgressByLessonUseCase implements FindProgressByLessonPort {
    private readonly progressPersistencePort;
    constructor(progressPersistencePort: ProgressPersistencePort);
    findProgressByLesson(userId: string, lessonId: string): Promise<ProgressEntity | null>;
}
