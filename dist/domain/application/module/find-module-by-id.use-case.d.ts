import { ModuleEntity } from "@domain/models/entities/module.entity";
import { FindModuleByIdPort } from "@ports/in/module/find-module-by-id.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
export declare class FindModuleByIdUseCase implements FindModuleByIdPort {
    private readonly modulePersistencePort;
    constructor(modulePersistencePort: ModulePersistencePort);
    findModuleById(moduleId: string): Promise<ModuleEntity | null>;
}
