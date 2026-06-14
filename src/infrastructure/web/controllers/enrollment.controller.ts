import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { FindEnrollmentByIdsPort } from "@ports/in/enrollment/find-enrollment-by-ids.port";
import { FindAllEnrollmentsByUserPort } from "@ports/in/enrollment/find-all-enrollments-by-user.port";
import { CompleteEnrollmentPort } from "@ports/in/enrollment/complete-enrollment.port";

const logger = createLogger('CONTROLLER', 'ENROLLMENT');

@injectable()
export class EnrollmentController {

    constructor(
        @inject("CreateEnrollmentPort") private createEnrollmentPort: CreateEnrollmentPort,
        @inject("FindEnrollmentByIdsPort") private findEnrollmentByIdsPort: FindEnrollmentByIdsPort,
        @inject("FindAllEnrollmentsByUserPort") private findAllEnrollmentsByUserPort: FindAllEnrollmentsByUserPort,
        @inject("CompleteEnrollmentPort") private completeEnrollmentPort: CompleteEnrollmentPort
    ) {}

    async createEnrollment(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.createEnrollmentPort.createEnrollment(dto);
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findEnrollmentByIds(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id;
            const { courseId } = ctx.query;
            const response = await this.findEnrollmentByIdsPort.findEnrollmentByIds(userId, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findAllEnrollmentsByUser(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findAllEnrollmentsByUserPort.findAllEnrollmentsByUser(userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async completeEnrollment(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id;
            const { courseId } = ctx.request.body;
            if (!courseId) {
                ctx.status = STATUS_CODES.BAD_REQUEST;
                ctx.body = { success: false, message: "courseId is required" };
                return;
            }
            const response = await this.completeEnrollmentPort.completeEnrollment(userId, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
