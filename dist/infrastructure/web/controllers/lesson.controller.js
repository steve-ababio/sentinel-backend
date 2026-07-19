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
exports.LessonController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'LESSON');
let LessonController = class LessonController {
    constructor(createLessonPort, findLessonsByModulePort, countLessonsByCoursePort, findPreviousLessonPort, findLessonByIdPort, deleteLessonPort, findNextLessonPort) {
        this.createLessonPort = createLessonPort;
        this.findLessonsByModulePort = findLessonsByModulePort;
        this.countLessonsByCoursePort = countLessonsByCoursePort;
        this.findPreviousLessonPort = findPreviousLessonPort;
        this.findLessonByIdPort = findLessonByIdPort;
        this.deleteLessonPort = deleteLessonPort;
        this.findNextLessonPort = findNextLessonPort;
    }
    async createLesson(ctx) {
        try {
            const dto = ctx.request.body;
            const response = await this.createLessonPort.createLesson(dto);
            ctx.status = status_codes_1.STATUS_CODES.CREATED;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findLessonsByModule(ctx) {
        try {
            const { moduleId } = ctx.params;
            const response = await this.findLessonsByModulePort.findLessonsByModule(moduleId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async countLessonsByCourse(ctx) {
        try {
            const { courseId } = ctx.params;
            const response = await this.countLessonsByCoursePort.countLessonsByCourse(courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findPreviousLesson(ctx) {
        try {
            const { lessonId, currentLessonOrder } = ctx.params;
            const response = await this.findPreviousLessonPort.findPreviousLesson(lessonId, currentLessonOrder);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findLessonById(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.findLessonByIdPort.findLessonById(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async deleteLesson(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteLessonPort.deleteLesson(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findNextLesson(ctx) {
        try {
            const { lessonId, currentLessonOrder } = ctx.params;
            const response = await this.findNextLessonPort.findNextLesson(lessonId, currentLessonOrder);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.LessonController = LessonController;
exports.LessonController = LessonController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CreateLessonPort")),
    __param(1, (0, tsyringe_1.inject)("FindLessonsByModulePort")),
    __param(2, (0, tsyringe_1.inject)("CountLessonsByCoursePort")),
    __param(3, (0, tsyringe_1.inject)("FindPreviousLessonPort")),
    __param(4, (0, tsyringe_1.inject)("FindLessonByIdPort")),
    __param(5, (0, tsyringe_1.inject)("DeleteLessonPort")),
    __param(6, (0, tsyringe_1.inject)("FindNextLessonPort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], LessonController);
