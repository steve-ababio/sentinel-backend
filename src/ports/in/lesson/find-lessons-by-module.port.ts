import { LessonEntity } from "@domain/models/entities/lesson.entity";

export interface FindLessonsByModulePort {
    findLessonsByModule(moduleId: string): Promise<LessonEntity[]>;
}
