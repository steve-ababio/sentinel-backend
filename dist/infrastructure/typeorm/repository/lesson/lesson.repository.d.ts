import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class LessonRepository implements LessonPersistencePort {
    private toPersistence;
    private toDomain;
    findByModule(moduleId: string): Promise<LessonEntity[]>;
    findById(lessonId: string): Promise<LessonEntity | null>;
    findNextLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
    findPreviousLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
    countByCourse(courseId: string): Promise<number>;
    create(lessonEntity: LessonEntity): Promise<LessonEntity>;
    delete(lessonId: string): Promise<void>;
}
