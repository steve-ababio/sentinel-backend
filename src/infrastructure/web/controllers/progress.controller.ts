import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { GetLastWatchedLessonPort } from "@ports/in/progress/get-last-watched-lesson.port";
import { UpdateProgressPort } from "@ports/in/progress/update-progress.port";
import { FindCourseProgressPort } from "@ports/in/progress/find-course-progress.port";
import { SaveProgressPort } from "@ports/in/progress/save-progress.port";
import { FindProgressByLessonPort } from "@ports/in/progress/find-progress-by-lesson.port";

const logger = createLogger('CONTROLLER', 'PROGRESS');

@injectable()
export class ProgressController {

    constructor(
        @inject("GetLastWatchedLessonPort") private getLastWatchedLessonPort: GetLastWatchedLessonPort,
        @inject("UpdateProgressPort") private updateProgressPort: UpdateProgressPort,
        @inject("FindCourseProgressPort") private findCourseProgressPort: FindCourseProgressPort,
        @inject("SaveProgressPort") private saveProgressPort: SaveProgressPort,
        @inject("FindProgressByLessonPort") private findProgressByLessonPort: FindProgressByLessonPort
    ) {}

    async getLastWatchedLesson(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.getLastWatchedLessonPort.getLastWatchedLesson(userId, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async updateProgress(ctx: any) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateProgressPort.updateProgress(id, dto);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findCourseProgress(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findCourseProgressPort.findCourseProgress(userId, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async saveProgress(ctx: any) {
        try {
            const { lessonId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const dto = ctx.request.body;
            const response = await this.saveProgressPort.saveProgress({ ...dto, userId}, lessonId );
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findProgressByLesson(ctx: any) {
        try {
            const { lessonId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findProgressByLessonPort.findProgressByLesson(userId, lessonId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
