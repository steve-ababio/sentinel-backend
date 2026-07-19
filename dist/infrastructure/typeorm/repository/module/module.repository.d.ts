import { BaseResponse } from "@common/global/types";
import { ModuleEntity } from "@domain/models/entities/module.entity";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
export declare class ModuleRepository implements ModulePersistencePort {
    private toPersistence;
    private toDomain;
    private seedTestForModule;
    save(moduleEntity: ModuleEntity): Promise<ModuleEntity>;
    findById(moduleId: string): Promise<ModuleEntity | null>;
    findByCourse(courseId: string): Promise<ModuleEntity[]>;
    delete(moduleId: string): Promise<BaseResponse>;
}
