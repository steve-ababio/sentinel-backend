import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { FindReviewsByCoursePort } from "@ports/in/review/find-reviews-by-course.port";
import { GetCourseReviewStatsPort } from "@ports/in/review/get-course-review-stats.port";
import { CreateReviewPort } from "@ports/in/review/create-review.port";

const logger = createLogger('CONTROLLER', 'REVIEW');

@injectable()
export class ReviewController {

    constructor(
        @inject("FindReviewsByCoursePort") private findReviewsByCoursePort: FindReviewsByCoursePort,
        @inject("GetCourseReviewStatsPort") private getCourseReviewStatsPort: GetCourseReviewStatsPort,
        @inject("CreateReviewPort") private createReviewPort: CreateReviewPort
    ) {}

    async findReviewsByCourse(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const response = await this.findReviewsByCoursePort.findReviewsByCourse(courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async getCourseReviewStats(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const response = await this.getCourseReviewStatsPort.getCourseReviewStats(courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async createReview(ctx: any) {
        try {
            const { courseId } = ctx.params;
            const { rating, comment } = ctx.request.body;
            const userId = ctx.state.user?.id;
            if (!userId) {
                ctx.status = STATUS_CODES.UNAUTHORIZED || 401;
                ctx.body = { message: "Unauthorized reviewer" };
                return;
            }
            await this.createReviewPort.createReview(userId, courseId, rating, comment);
            ctx.status = STATUS_CODES.CREATED || 201;
            ctx.body = { message: "Review created successfully" };
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
