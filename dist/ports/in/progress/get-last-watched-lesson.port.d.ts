import { LessonEntity } from "@domain/models/entities/lesson.entity";
export interface GetLastWatchedLessonPort {
    getLastWatchedLesson(userId: string, courseId: string): Promise<LessonEntity | null>;
}
