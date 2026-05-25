import { LessonEntity } from "@domain/models/entities/lesson.entity";

export interface CreateLessonPort {
    createLesson(lesson: LessonEntity): Promise<LessonEntity>;
}
