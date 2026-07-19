import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindLessonsByModulePort } from "@ports/in/lesson/find-lessons-by-module.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
export declare class FindLessonsByModuleUseCase implements FindLessonsByModulePort {
    private readonly lessonPersistencePort;
    constructor(lessonPersistencePort: LessonPersistencePort);
    findLessonsByModule(moduleId: string): Promise<LessonEntity[]>;
}
