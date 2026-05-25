import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { ProgressEntity } from "@domain/models/entities/progress.entity";

export interface ProgressPersistencePort{
    update(progress:ProgressEntity,lessonId:string): Promise<void>;
    save(progress:ProgressEntity,lessonId:string): Promise<void>;
    findByLesson(userId: string,lessonId: string,): Promise<ProgressEntity | null>;
    findCourseProgress(userId: string,courseId: string,): Promise<ProgressEntity[]>;
    getLastWatchedLesson(userId: string,courseId: string,): Promise<LessonEntity | null>;
  }