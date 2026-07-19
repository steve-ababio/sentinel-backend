import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindLessonByIdPort } from "@ports/in/lesson/find-lesson-by-id.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class FindLessonByIdUseCase implements FindLessonByIdPort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    findLessonById(lessonId: string): Promise<LessonEntity | null>;
}
