import { ModuleEntity } from "@domain/models/entities/module.entity";
export interface SaveModulePort {
    saveModule(module: ModuleEntity): Promise<ModuleEntity>;
}
