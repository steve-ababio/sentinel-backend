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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptionService = void 0;
const tsyringe_1 = require("tsyringe");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("stream/promises");
const ffmpegService_1 = require("./ffmpegService");
const geminiService_1 = require("./geminiService");
let TranscriptionService = class TranscriptionService {
    constructor(ffmpegService, geminiService) {
        this.ffmpegService = ffmpegService;
        this.geminiService = geminiService;
    }
    async getTranscript(lessonId, lessonTitle, lessonNotes, videoUrl, duration) {
        const tempDir = path_1.default.join(process.cwd(), "temp");
        const cachePath = path_1.default.join(tempDir, `${lessonId}.json`);
        if (fs_1.default.existsSync(cachePath)) {
            try {
                const cachedData = fs_1.default.readFileSync(cachePath, "utf-8");
                return JSON.parse(cachedData);
            }
            catch (err) {
                console.error("Failed to read transcription cache", err);
            }
        }
        const hasGemini = !!process.env.GEMINI_API_KEY;
        if (hasGemini && videoUrl) {
            try {
                console.log(`Starting transcription pipeline for lesson ${lessonId} (${lessonTitle})...`);
                if (!fs_1.default.existsSync(tempDir)) {
                    fs_1.default.mkdirSync(tempDir, { recursive: true });
                }
                const fileStoragePort = tsyringe_1.container.resolve("FileStoragePort");
                let fileKey = videoUrl;
                if (videoUrl.includes(".amazonaws.com/")) {
                    fileKey = videoUrl.split(".amazonaws.com/")[1];
                }
                console.log(`Downloading video from S3 key: ${fileKey}...`);
                const { stream } = await fileStoragePort.streamFile(fileKey);
                const videoTempPath = path_1.default.join(tempDir, `${lessonId}-video.mp4`);
                const audioTempPath = path_1.default.join(tempDir, `${lessonId}-audio.mp3`);
                const writeStream = fs_1.default.createWriteStream(videoTempPath);
                await (0, promises_1.pipeline)(stream, writeStream);
                console.log("Extracting audio using FFmpeg...");
                await this.ffmpegService.extractAudio(videoTempPath, audioTempPath);
                console.log("Transcribing audio using Gemini...");
                const segments = await this.geminiService.transcribeAudio(audioTempPath);
                fs_1.default.writeFileSync(cachePath, JSON.stringify(segments, null, 2));
                try {
                    fs_1.default.unlinkSync(videoTempPath);
                    fs_1.default.unlinkSync(audioTempPath);
                }
                catch (e) {
                }
                console.log(`Transcription pipeline completed successfully for lesson ${lessonId}.`);
                return segments;
            }
            catch (err) {
                console.error("Transcription pipeline failed. Returning empty list.", err);
            }
        }
        const segments = [];
        try {
            if (!fs_1.default.existsSync(tempDir)) {
                fs_1.default.mkdirSync(tempDir, { recursive: true });
            }
            fs_1.default.writeFileSync(cachePath, JSON.stringify(segments, null, 2));
        }
        catch (e) {
        }
        return segments;
    }
};
exports.TranscriptionService = TranscriptionService;
exports.TranscriptionService = TranscriptionService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [ffmpegService_1.FfmpegService,
        geminiService_1.GeminiService])
], TranscriptionService);
