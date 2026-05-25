import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { CreateLessonPort } from "@ports/in/lesson/create-lesson.port";
import { FindLessonsByModulePort } from "@ports/in/lesson/find-lessons-by-module.port";
import { CountLessonsByCoursePort } from "@ports/in/lesson/count-lessons-by-course.port";
import { FindPreviousLessonPort } from "@ports/in/lesson/find-previous-lesson.port";
import { FindLessonByIdPort } from "@ports/in/lesson/find-lesson-by-id.port";
import { DeleteLessonPort } from "@ports/in/lesson/delete-lesson.port";
import { FindNextLessonPort } from "@ports/in/lesson/find-next-lesson.port";

const logger = createLogger('CONTROLLER', 'LESSON');

@injectable()
export class LessonController {

    constructor(
        @inject("CreateLessonPort") private createLessonPort: CreateLessonPort,
        @inject("FindLessonsByModulePort") private findLessonsByModulePort: FindLessonsByModulePort,
        @inject("CountLessonsByCoursePort") private countLessonsByCoursePort: CountLessonsByCoursePort,
        @inject("FindPreviousLessonPort") private findPreviousLessonPort: FindPreviousLessonPort,
        @inject("FindLessonByIdPort") private findLessonByIdPort: FindLessonByIdPort,
        @inject("DeleteLessonPort") private deleteLessonPort: DeleteLessonPort,
        @inject("FindNextLessonPort") private findNextLessonPort: FindNextLessonPort
    ) {}

    async createLesson(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.createLessonPort.createLesson(dto);
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findLessonsByModule(ctx: any) {
        try {
            const { moduleId } = ctx.params;
            const response = await this.findLessonsByModulePort.findLessonsByModule(moduleId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async countLessonsByCourse(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const response = await this.countLessonsByCoursePort.countLessonsByCourse(courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findPreviousLesson(ctx: any) {
        try {
            const { lessonId, currentLessonOrder } = ctx.params; 
            const response = await this.findPreviousLessonPort.findPreviousLesson(lessonId,currentLessonOrder);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findLessonById(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.findLessonByIdPort.findLessonById(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async deleteLesson(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteLessonPort.deleteLesson(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findNextLesson(ctx: any) {
        try {
            const { lessonId, currentLessonOrder } = ctx.params; 
            const response = await this.findNextLessonPort.findNextLesson(lessonId,currentLessonOrder);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
