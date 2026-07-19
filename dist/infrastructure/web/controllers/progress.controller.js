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
exports.ProgressController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'PROGRESS');
let ProgressController = class ProgressController {
    constructor(getLastWatchedLessonPort, updateProgressPort, findCourseProgressPort, saveProgressPort, findProgressByLessonPort) {
        this.getLastWatchedLessonPort = getLastWatchedLessonPort;
        this.updateProgressPort = updateProgressPort;
        this.findCourseProgressPort = findCourseProgressPort;
        this.saveProgressPort = saveProgressPort;
        this.findProgressByLessonPort = findProgressByLessonPort;
    }
    async getLastWatchedLesson(ctx) {
        try {
            const { courseId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.getLastWatchedLessonPort.getLastWatchedLesson(userId, courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async updateProgress(ctx) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateProgressPort.updateProgress(id, dto);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findCourseProgress(ctx) {
        try {
            const { courseId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findCourseProgressPort.findCourseProgress(userId, courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async saveProgress(ctx) {
        try {
            const { lessonId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const dto = ctx.request.body;
            const response = await this.saveProgressPort.saveProgress({ ...dto, userId }, lessonId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findProgressByLesson(ctx) {
        try {
            const { lessonId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findProgressByLessonPort.findProgressByLesson(userId, lessonId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.ProgressController = ProgressController;
exports.ProgressController = ProgressController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("GetLastWatchedLessonPort")),
    __param(1, (0, tsyringe_1.inject)("UpdateProgressPort")),
    __param(2, (0, tsyringe_1.inject)("FindCourseProgressPort")),
    __param(3, (0, tsyringe_1.inject)("SaveProgressPort")),
    __param(4, (0, tsyringe_1.inject)("FindProgressByLessonPort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProgressController);
