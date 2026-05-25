import { ModuleEntity } from "@domain/models/entities/module.entity";

export interface FindModulesByCoursePort {
    findModulesByCourse(courseId: string): Promise<ModuleEntity[]>;
}
