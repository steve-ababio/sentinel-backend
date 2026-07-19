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
exports.CourseController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'COURSE');
let CourseController = class CourseController {
    constructor(createCoursePort, findAllCoursesPort, findCourseByIdPort, updateCoursePort, deleteCoursePort, getLeagueTablePort) {
        this.createCoursePort = createCoursePort;
        this.findAllCoursesPort = findAllCoursesPort;
        this.findCourseByIdPort = findCourseByIdPort;
        this.updateCoursePort = updateCoursePort;
        this.deleteCoursePort = deleteCoursePort;
        this.getLeagueTablePort = getLeagueTablePort;
    }
    async createCourse(ctx) {
        try {
            const dto = ctx.request.body;
            const response = await this.createCoursePort.createCourse(dto);
            ctx.status = status_codes_1.STATUS_CODES.CREATED;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findAllCourses(ctx) {
        try {
            const query = ctx.query;
            const response = await this.findAllCoursesPort.findAllCourses(query);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async findCourseById(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.findCourseByIdPort.findCourseById(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async updateCourse(ctx) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateCoursePort.updateCourse({ ...dto, id, });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async deleteCourse(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteCoursePort.deleteCourse(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async getLeagueTable(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.getLeagueTablePort.getLeagueTable(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.CourseController = CourseController;
exports.CourseController = CourseController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CreateCoursePort")),
    __param(1, (0, tsyringe_1.inject)("FindAllCoursesPort")),
    __param(2, (0, tsyringe_1.inject)("FindCourseByIdPort")),
    __param(3, (0, tsyringe_1.inject)("UpdateCoursePort")),
    __param(4, (0, tsyringe_1.inject)("DeleteCoursePort")),
    __param(5, (0, tsyringe_1.inject)("GetLeagueTablePort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], CourseController);
