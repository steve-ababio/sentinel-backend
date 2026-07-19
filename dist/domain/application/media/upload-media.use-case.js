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
exports.UploadMediaUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("@infrastructure/web/util/logger");
const route_error_1 = require("@infrastructure/web/util/route-error");
const status_codes_1 = require("@common/web/status-codes");
const logger = (0, logger_1.createLogger)('USE_CASE', 'UPLOAD_MEDIA');
let UploadMediaUseCase = class UploadMediaUseCase {
    constructor(fileStoragePort) {
        this.fileStoragePort = fileStoragePort;
    }
    async uploadMedia(file, folder) {
        if (!file) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, "File is required");
        }
        try {
            logger.info(`Uploading file ${file.originalname} to folder ${folder || 'root'}`);
            const result = await this.fileStoragePort.uploadFile(file, folder);
            logger.info(`File uploaded successfully: ${result.key}`);
            return result;
        }
        catch (error) {
            logger.error(`Error uploading file: ${error}`);
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to upload file");
        }
    }
    async generateUploadUrl(fileName, contentType, folder) {
        if (!fileName || !contentType) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, "fileName and contentType are required");
        }
        try {
            logger.info(`Generating upload URL for ${fileName} (${contentType}) in folder ${folder || 'root'}`);
            const result = await this.fileStoragePort.generatePresignedUploadUrl(fileName, contentType, folder);
            logger.info(`Upload URL generated successfully for key: ${result.key}`);
            return result;
        }
        catch (error) {
            logger.error(`Error generating upload URL: ${error}`);
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to generate upload URL");
        }
    }
};
exports.UploadMediaUseCase = UploadMediaUseCase;
exports.UploadMediaUseCase = UploadMediaUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FileStoragePort")),
    __metadata("design:paramtypes", [Object])
], UploadMediaUseCase);
