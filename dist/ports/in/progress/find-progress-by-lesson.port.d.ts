import { ProgressEntity } from "@domain/models/entities/progress.entity";
export interface FindProgressByLessonPort {
    findProgressByLesson(userId: string, lessonId: string): Promise<ProgressEntity | null>;
}
