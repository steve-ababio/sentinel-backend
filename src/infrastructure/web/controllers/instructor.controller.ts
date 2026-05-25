import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";

import { CreateInstructorPort } from "@ports/in/instructor/create-instructor.port";
import { UpdateInstructorPort } from "@ports/in/instructor/update-instructor.port";
import { GetInstructorPort } from "@ports/in/instructor/get-instructor.port";
import { DeleteInstructorPort } from "@ports/in/instructor/delete-instructor.port";
import { ListInstructorsPort } from "@ports/in/instructor/list-instructors.port";

const logger = createLogger('CONTROLLER', 'INSTRUCTOR');

@injectable()
export class InstructorController {

    constructor(
        @inject("CreateInstructorPort") private createInstructorPort: CreateInstructorPort,
        @inject("UpdateInstructorPort") private updateInstructorPort: UpdateInstructorPort,
        @inject("GetInstructorPort") private getInstructorPort: GetInstructorPort,
        @inject("DeleteInstructorPort") private deleteInstructorPort: DeleteInstructorPort,
        @inject("ListInstructorsPort") private listInstructorsPort: ListInstructorsPort
    ) {}

    async createInstructor(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.createInstructorPort.createInstructor(dto);
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async updateInstructor(ctx: any) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateInstructorPort.updateInstructor({ ...dto, id });
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async getInstructor(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.getInstructorPort.getInstructor(id);
            if (!response) {
                ctx.status = STATUS_CODES.NOT_FOUND;
                ctx.body = { message: "Instructor not found" };
                return;
            }
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async deleteInstructor(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteInstructorPort.deleteInstructor(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async list(ctx: any) {
        try {
            const params = ctx.query;
            if (params.page) params.page = parseInt(params.page, 10);
            if (params.resultsPerPage) params.resultsPerPage = parseInt(params.resultsPerPage, 10);

            const response = await this.listInstructorsPort.listInstructors(params);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
