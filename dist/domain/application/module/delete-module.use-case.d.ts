import { BaseResponse } from "@common/global/types";
import { DeleteModulePort } from "@ports/in/module/delete-module.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
export declare class DeleteModuleUseCase implements DeleteModulePort {
    private readonly modulePersistencePort;
    constructor(modulePersistencePort: ModulePersistencePort);
    deleteModule(moduleId: string): Promise<BaseResponse>;
}
