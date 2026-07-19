"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'REVIEW');
let ReviewController = class ReviewController {
    constructor(findReviewsByCoursePort, getCourseReviewStatsPort, createReviewPort) {
        this.findReviewsByCoursePort = findReviewsByCoursePort;
        this.getCourseReviewStatsPort = getCourseReviewStatsPort;
        this.createReviewPort = createReviewPort;
    }
    async findReviewsByCourse(ctx) {
        try {
            const { courseId } = ctx.params;
            const response = await this.findReviewsByCoursePort.findReviewsByCourse(courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async getCourseReviewStats(ctx) {
        try {
            const { courseId } = ctx.params;
            const response = await this.getCourseReviewStatsPort.getCourseReviewStats(courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async createReview(ctx) {
        try {
            const { courseId } = ctx.params;
            const { rating, comment } = ctx.request.body;
            const userId = ctx.state.user?.id;
            if (!userId) {
                ctx.status = status_codes_1.STATUS_CODES.UNAUTHORIZED || 401;
                ctx.body = { message: "Unauthorized reviewer" };
                return;
            }
            await this.createReviewPort.createReview(userId, courseId, rating, comment);
            ctx.status = status_codes_1.STATUS_CODES.CREATED || 201;
            ctx.body = { message: "Review created successfully" };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.ReviewController = ReviewController;
exports.ReviewController = ReviewController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FindReviewsByCoursePort")),
    __param(1, (0, tsyringe_1.inject)("GetCourseReviewStatsPort")),
    __param(2, (0, tsyringe_1.inject)("CreateReviewPort")),
    __metadata("design:paramtypes", [Object, Object, Object])
], ReviewController);
