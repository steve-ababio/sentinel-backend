import { LessonEntity } from "@domain/models/entities/lesson.entity";

export interface FindNextLessonPort {
    findNextLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null>;
}
