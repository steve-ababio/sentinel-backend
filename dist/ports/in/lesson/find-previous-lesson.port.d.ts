import { LessonEntity } from "@domain/models/entities/lesson.entity";
export interface FindPreviousLessonPort {
    findPreviousLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
}
