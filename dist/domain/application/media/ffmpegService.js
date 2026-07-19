"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegService = void 0;
const tsyringe_1 = require("tsyringe");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.default.path);
let FfmpegService = class FfmpegService {
    async extractAudio(videoPath, outputAudioPath) {
        return new Promise((resolve, reject) => {
            const outputDir = path_1.default.dirname(outputAudioPath);
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            if (fs_1.default.existsSync(outputAudioPath)) {
                try {
                    fs_1.default.unlinkSync(outputAudioPath);
                }
                catch (e) {
                }
            }
            console.log("video path: ", videoPath);
            console.log("output audio path: ", outputAudioPath);
            (0, fluent_ffmpeg_1.default)(videoPath)
                .noVideo()
                .audioCodec("libmp3lame")
                .audioBitrate(128)
                .save(outputAudioPath)
                .on("end", () => {
                resolve(outputAudioPath);
            })
                .on("error", (err) => {
                reject(err);
            });
        });
    }
};
exports.FfmpegService = FfmpegService;
exports.FfmpegService = FfmpegService = __decorate([
    (0, tsyringe_1.injectable)()
], FfmpegService);
