import { BaseResponse } from "@common/global/types";
import { ModuleEntity } from "@domain/models/entities/module.entity";

export interface ModulePersistencePort {
    findByCourse(courseId: string): Promise<ModuleEntity[]>;
    findById(moduleId: string): Promise<ModuleEntity | null>;
    save(module: ModuleEntity): Promise<ModuleEntity>;
    delete(moduleId: string): Promise<BaseResponse>;
  }