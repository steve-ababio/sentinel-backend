import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { LessonEntity } from "@domain/models/entities/lesson.entity";
export declare class ProgressRepository implements ProgressPersistencePort {
    private toPersistence;
    private toDomain;
    private toLessonDomain;
    update(progressEntity: ProgressEntity, lessonId: string): Promise<void>;
    save(progressEntity: ProgressEntity, lessonId: string): Promise<void>;
    findByLesson(userId: string, lessonId: string): Promise<ProgressEntity | null>;
    findCourseProgress(userId: string, courseId: string): Promise<ProgressEntity[]>;
    getLastWatchedLesson(userId: string, courseId: string): Promise<LessonEntity | null>;
}
