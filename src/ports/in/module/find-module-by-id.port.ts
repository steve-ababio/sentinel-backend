import { ModuleEntity } from "@domain/models/entities/module.entity";

export interface FindModuleByIdPort {
    findModuleById(moduleId: string): Promise<ModuleEntity | null>;
}
