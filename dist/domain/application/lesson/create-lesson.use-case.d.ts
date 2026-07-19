import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { CreateLessonPort } from "@ports/in/lesson/create-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class CreateLessonUseCase implements CreateLessonPort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    createLesson(lesson: LessonEntity): Promise<LessonEntity>;
}
