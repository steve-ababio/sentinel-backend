import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { CreateCoursePort } from "@ports/in/course/create-course.port";
import { FindAllCoursesPort } from "@ports/in/course/find-all-courses.port";
import { FindCourseByIdPort } from "@ports/in/course/find-course-by-id.port";
import { UpdateCoursePort } from "@ports/in/course/update-course.port";
import { DeleteCoursePort } from "@ports/in/course/delete-course.port";
import { GetLeagueTablePort } from "@ports/in/course/get-league-table.port";

const logger = createLogger('CONTROLLER', 'COURSE');

@injectable()
export class CourseController {

    constructor(
        @inject("CreateCoursePort") private createCoursePort: CreateCoursePort,
        @inject("FindAllCoursesPort") private findAllCoursesPort: FindAllCoursesPort,
        @inject("FindCourseByIdPort") private findCourseByIdPort: FindCourseByIdPort,
        @inject("UpdateCoursePort") private updateCoursePort: UpdateCoursePort,
        @inject("DeleteCoursePort") private deleteCoursePort: DeleteCoursePort,
        @inject("GetLeagueTablePort") private getLeagueTablePort: GetLeagueTablePort
    ) {}

    async createCourse(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.createCoursePort.createCourse(dto);
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findAllCourses(ctx: any) {
        try {
            const query = ctx.query; // pagination, filters, etc.
            const response = await this.findAllCoursesPort.findAllCourses(query);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findCourseById(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.findCourseByIdPort.findCourseById(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
    
    async updateCourse(ctx: any) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateCoursePort.updateCourse({...dto,id,});
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async deleteCourse(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteCoursePort.deleteCourse(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async getLeagueTable(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.getLeagueTablePort.getLeagueTable(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
