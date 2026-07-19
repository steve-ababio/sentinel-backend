import { ModuleEntity } from "@domain/models/entities/module.entity";
import { FindModulesByCoursePort } from "@ports/in/module/find-modules-by-course.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
export declare class FindModulesByCourseUseCase implements FindModulesByCoursePort {
    private readonly modulePersistencePort;
    constructor(modulePersistencePort: ModulePersistencePort);
    findModulesByCourse(courseId: string): Promise<ModuleEntity[]>;
}
