import { LessonEntity } from "@domain/models/entities/lesson.entity";

export interface LessonPersistencePort {
    findByModule(moduleId: string): Promise<LessonEntity[]>;
    findById(lessonId: string): Promise<LessonEntity | null>;
    findNextLesson(courseId: string,currentLessonOrder: number): Promise<LessonEntity | null>;
    findPreviousLesson(courseId: string,currentLessonOrder: number,): Promise<LessonEntity | null>;
    countByCourse(courseId: string): Promise<number>;
    create(lesson: LessonEntity): Promise<LessonEntity>;
    delete(lessonId: string): Promise<void>;
  }