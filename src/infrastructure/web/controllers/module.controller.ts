import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { SaveModulePort } from "@ports/in/module/save-module.port";
import { FindModuleByIdPort } from "@ports/in/module/find-module-by-id.port";
import { DeleteModulePort } from "@ports/in/module/delete-module.port";
import { FindModulesByCoursePort } from "@ports/in/module/find-modules-by-course.port";

const logger = createLogger('CONTROLLER', 'MODULE');

@injectable()
export class ModuleController {

    constructor(
        @inject("SaveModulePort") private saveModulePort: SaveModulePort,
        @inject("FindModuleByIdPort") private findModuleByIdPort: FindModuleByIdPort,
        @inject("DeleteModulePort") private deleteModulePort: DeleteModulePort,
        @inject("FindModulesByCoursePort") private findModulesByCoursePort: FindModulesByCoursePort
    ) {}

    async saveModule(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.saveModulePort.saveModule(dto);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findModuleById(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.findModuleByIdPort.findModuleById(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async deleteModule(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteModulePort.deleteModule(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findModulesByCourse(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const response = await this.findModulesByCoursePort.findModulesByCourse(courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
