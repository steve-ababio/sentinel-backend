import { TranscriptSegment } from "./transcriptionService";
export declare class GeminiService {
    private genAI;
    constructor();
    transcribeAudio(audioPath: string): Promise<TranscriptSegment[]>;
}
