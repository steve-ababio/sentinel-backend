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
exports.GeminiService = void 0;
const tsyringe_1 = require("tsyringe");
const generative_ai_1 = require("@google/generative-ai");
const fs_1 = __importDefault(require("fs"));
let GeminiService = class GeminiService {
    constructor() {
        this.genAI = null;
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        }
    }
    async transcribeAudio(audioPath) {
        if (!this.genAI) {
            throw new Error("GEMINI_API_KEY is not configured in environment variables.");
        }
        const responseSchema = {
            type: generative_ai_1.SchemaType.ARRAY,
            description: "List of transcript segments with start and end timestamps in seconds.",
            items: {
                type: generative_ai_1.SchemaType.OBJECT,
                properties: {
                    start: {
                        type: generative_ai_1.SchemaType.INTEGER,
                        description: "Start time of this segment in seconds.",
                    },
                    end: {
                        type: generative_ai_1.SchemaType.INTEGER,
                        description: "End time of this segment in seconds.",
                    },
                    text: {
                        type: generative_ai_1.SchemaType.STRING,
                        description: "The transcription of words spoken in this segment.",
                    },
                },
                required: ["start", "end", "text"],
            },
        };
        const model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        console.log("Transcribing audio using Gemini 1.5 Flash...");
        const audioData = {
            inlineData: {
                data: Buffer.from(fs_1.default.readFileSync(audioPath)).toString("base64"),
                mimeType: "audio/mp3",
            },
        };
        const prompt = "Transcribe the following audio file. Return a JSON list of all spoken segments, each containing their start and end timestamps in seconds and the text spoken.";
        const result = await model.generateContent([prompt, audioData]);
        const responseText = result.response.text();
        if (responseText) {
            const parsed = JSON.parse(responseText);
            if (Array.isArray(parsed)) {
                return parsed.map((item) => ({
                    start: typeof item.start === 'number' ? Math.round(item.start) : 0,
                    end: typeof item.end === 'number' ? Math.round(item.end) : 10,
                    text: String(item.text || "").trim(),
                }));
            }
        }
        return [];
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], GeminiService);
