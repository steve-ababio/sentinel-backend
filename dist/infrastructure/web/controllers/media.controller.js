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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const stream_1 = require("stream");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const lesson_entity_1 = require("@infrastructure/typeorm/entities/lesson/lesson.entity");
const transcriptionService_1 = require("@domain/application/media/transcriptionService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("stream/promises");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'MEDIA');
let MediaController = class MediaController {
    constructor(streamVideoPort, uploadMediaPort, transcriptionService) {
        this.streamVideoPort = streamVideoPort;
        this.uploadMediaPort = uploadMediaPort;
        this.transcriptionService = transcriptionService;
    }
    async streamVideo(ctx) {
        try {
            const { videoId } = ctx.params;
            const range = ctx.request.headers.range;
            const response = await this.streamVideoPort.streamVideo(videoId, range);
            if (response.contentRange)
                ctx.set("Content-Range", response.contentRange);
            if (response.acceptRanges)
                ctx.set("Accept-Ranges", response.acceptRanges);
            ctx.set("Content-Length", response.contentLength.toString());
            ctx.set("Content-Type", response.contentType);
            ctx.status = response.statusCode || status_codes_1.STATUS_CODES.PARTIAL_CONTENT;
            ctx.body = response.stream;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async uploadMedia(ctx) {
        try {
            const file = ctx.request.file;
            const { folder } = ctx.request.body || {};
            const response = await this.uploadMediaPort.uploadMedia(file, folder);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                message: "File uploaded successfully",
                data: response
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async generateUploadUrl(ctx) {
        try {
            const { fileName, contentType, folder } = ctx.request.body || {};
            const response = await this.uploadMediaPort.generateUploadUrl(fileName, contentType, folder);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                message: "Upload URL generated successfully",
                data: response
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async uploadLocal(ctx) {
        try {
            const { filename } = ctx.params;
            const uploadsDir = path_1.default.join(process.cwd(), "uploads");
            if (!fs_1.default.existsSync(uploadsDir)) {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            const filepath = path_1.default.join(uploadsDir, filename);
            const writeStream = fs_1.default.createWriteStream(filepath);
            await (0, promises_1.pipeline)(ctx.req, writeStream);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                message: "File uploaded locally successfully",
                data: {
                    url: `/api-backend/admin/uploads/${filename}`,
                    key: filename
                }
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async streamTranscript(ctx) {
        try {
            const { lessonId } = ctx.params;
            const durationParam = ctx.query.duration;
            const clientDuration = durationParam ? parseFloat(durationParam) : null;
            ctx.request.socket.setKeepAlive(true);
            ctx.set({
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            });
            const stream = new stream_1.PassThrough();
            ctx.body = stream;
            const lesson = await data_source_1.manager.findOne(lesson_entity_1.Lesson, { where: { id: lessonId } });
            if (!lesson) {
                stream.write(`event: error\ndata: ${JSON.stringify({ message: "Lesson not found" })}\n\n`);
                stream.end();
                return;
            }
            const totalDurationSeconds = clientDuration || (lesson.duration * 60) || 60;
            const segments = await this.transcriptionService.getTranscript(lesson.id, lesson.title, lesson.notes || lesson.description || "", lesson.videoUrl || "", totalDurationSeconds);
            let index = 0;
            const sendNextSegment = () => {
                if (index >= segments.length) {
                    stream.write(`event: complete\ndata: ${JSON.stringify({ status: "done" })}\n\n`);
                    stream.end();
                    return;
                }
                const segment = segments[index];
                stream.write(`data: ${JSON.stringify(segment)}\n\n`);
                index++;
                setTimeout(sendNextSegment, 800);
            };
            sendNextSegment();
            ctx.req.on("close", () => {
                stream.end();
            });
            ctx.req.on("finish", () => {
                stream.end();
            });
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.MediaController = MediaController;
exports.MediaController = MediaController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("StreamVideoPort")),
    __param(1, (0, tsyringe_1.inject)("UploadMediaPort")),
    __metadata("design:paramtypes", [Object, Object, transcriptionService_1.TranscriptionService])
], MediaController);
