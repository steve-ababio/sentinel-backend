import { SaveModulePort } from "@ports/in/module/save-module.port";
import { FindModuleByIdPort } from "@ports/in/module/find-module-by-id.port";
import { DeleteModulePort } from "@ports/in/module/delete-module.port";
import { FindModulesByCoursePort } from "@ports/in/module/find-modules-by-course.port";
export declare class ModuleController {
    private saveModulePort;
    private findModuleByIdPort;
    private deleteModulePort;
    private findModulesByCoursePort;
    constructor(saveModulePort: SaveModulePort, findModuleByIdPort: FindModuleByIdPort, deleteModulePort: DeleteModulePort, findModulesByCoursePort: FindModulesByCoursePort);
    saveModule(ctx: any): Promise<void>;
    findModuleById(ctx: any): Promise<void>;
    deleteModule(ctx: any): Promise<void>;
    findModulesByCourse(ctx: any): Promise<void>;
}
