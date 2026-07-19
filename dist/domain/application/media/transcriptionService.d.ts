import { FfmpegService } from "./ffmpegService";
import { GeminiService } from "./geminiService";
export interface TranscriptSegment {
    start: number;
    end: number;
    text: string;
}
export declare class TranscriptionService {
    private ffmpegService;
    private geminiService;
    constructor(ffmpegService: FfmpegService, geminiService: GeminiService);
    getTranscript(lessonId: string, lessonTitle: string, lessonNotes: string, videoUrl: string, duration: number): Promise<TranscriptSegment[]>;
}
