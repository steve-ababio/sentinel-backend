import { ModuleEntity } from "@domain/models/entities/module.entity";
import { SaveModulePort } from "@ports/in/module/save-module.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
export declare class SaveModuleUseCase implements SaveModulePort {
    private readonly modulePersistencePort;
    constructor(modulePersistencePort: ModulePersistencePort);
    saveModule(module: ModuleEntity): Promise<ModuleEntity>;
}
