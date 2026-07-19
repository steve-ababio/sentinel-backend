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
exports.InstructorController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'INSTRUCTOR');
let InstructorController = class InstructorController {
    constructor(createInstructorPort, updateInstructorPort, getInstructorPort, deleteInstructorPort, listInstructorsPort) {
        this.createInstructorPort = createInstructorPort;
        this.updateInstructorPort = updateInstructorPort;
        this.getInstructorPort = getInstructorPort;
        this.deleteInstructorPort = deleteInstructorPort;
        this.listInstructorsPort = listInstructorsPort;
    }
    async createInstructor(ctx) {
        try {
            const dto = ctx.request.body;
            const response = await this.createInstructorPort.createInstructor(dto);
            ctx.status = status_codes_1.STATUS_CODES.CREATED;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async updateInstructor(ctx) {
        try {
            const { id } = ctx.params;
            const dto = ctx.request.body;
            const response = await this.updateInstructorPort.updateInstructor({ ...dto, id });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async getInstructor(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.getInstructorPort.getInstructor(id);
            if (!response) {
                ctx.status = status_codes_1.STATUS_CODES.NOT_FOUND;
                ctx.body = { message: "Instructor not found" };
                return;
            }
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async deleteInstructor(ctx) {
        try {
            const { id } = ctx.params;
            const response = await this.deleteInstructorPort.deleteInstructor(id);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async list(ctx) {
        try {
            const params = ctx.query;
            if (params.page)
                params.page = parseInt(params.page, 10);
            if (params.resultsPerPage)
                params.resultsPerPage = parseInt(params.resultsPerPage, 10);
            const response = await this.listInstructorsPort.listInstructors(params);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.InstructorController = InstructorController;
exports.InstructorController = InstructorController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CreateInstructorPort")),
    __param(1, (0, tsyringe_1.inject)("UpdateInstructorPort")),
    __param(2, (0, tsyringe_1.inject)("GetInstructorPort")),
    __param(3, (0, tsyringe_1.inject)("DeleteInstructorPort")),
    __param(4, (0, tsyringe_1.inject)("ListInstructorsPort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], InstructorController);
