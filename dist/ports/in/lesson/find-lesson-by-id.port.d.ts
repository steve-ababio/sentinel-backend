import { LessonEntity } from "@domain/models/entities/lesson.entity";
export interface FindLessonByIdPort {
    findLessonById(lessonId: string): Promise<LessonEntity | null>;
}
