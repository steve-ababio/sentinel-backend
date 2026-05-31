import { inject, injectable, container } from "tsyringe";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { FileStoragePort } from "@ports/out/storage/file-storage.port";
import { FfmpegService } from "./ffmpegService";
import { GeminiService } from "./geminiService";

export interface TranscriptSegment {
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
}

@injectable()
export class TranscriptionService {
  
  constructor(
    private ffmpegService: FfmpegService,
    private geminiService: GeminiService
  ) {}

  async getTranscript(lessonId: string, lessonTitle: string, lessonNotes: string, videoUrl: string, duration: number): Promise<TranscriptSegment[]> {
    const tempDir = path.join(process.cwd(), "temp");
    const cachePath = path.join(tempDir, `${lessonId}.json`);

    // 1. Try to load from cache
    if (fs.existsSync(cachePath)) {
      try {
        const cachedData = fs.readFileSync(cachePath, "utf-8");
        return JSON.parse(cachedData);
      } catch (err) {
        console.error("Failed to read transcription cache", err);
      }
    }

    // 2. Check if Gemini is configured
    const hasGemini = !!process.env.GEMINI_API_KEY;

    if (hasGemini && videoUrl) {
      try {
        console.log(`Starting transcription pipeline for lesson ${lessonId} (${lessonTitle})...`);
        // Ensure temp dir exists
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        // Get S3 file storage adapter
        const fileStoragePort = container.resolve<FileStoragePort>("FileStoragePort");
        
        // Extract S3 key
        let fileKey = videoUrl;
        if (videoUrl.includes(".amazonaws.com/")) {
          fileKey = videoUrl.split(".amazonaws.com/")[1];
        }
        console.log(`Downloading video from S3 key: ${fileKey}...`);
        const { stream } = await fileStoragePort.streamFile(fileKey);
        
        const videoTempPath = path.join(tempDir, `${lessonId}-video.mp4`);
        const audioTempPath = path.join(tempDir, `${lessonId}-audio.mp3`);

        // Write stream to local temp video file
        const writeStream = fs.createWriteStream(videoTempPath);
        await pipeline(stream, writeStream);

        console.log("Extracting audio using FFmpeg...");
        await this.ffmpegService.extractAudio(videoTempPath, audioTempPath);

        console.log("Transcribing audio using Gemini...");
        const segments = await this.geminiService.transcribeAudio(audioTempPath);

        // Cache the result
        fs.writeFileSync(cachePath, JSON.stringify(segments, null, 2));

        // Clean up temp files
        try {
          fs.unlinkSync(videoTempPath);
          fs.unlinkSync(audioTempPath);
        } catch (e) {
          // ignore cleanup errors
        }

        console.log(`Transcription pipeline completed successfully for lesson ${lessonId}.`);
        return segments;
      } catch (err) {
        console.error("Transcription pipeline failed. Returning empty list.", err);
      }
    }

    // 3. Fallback: Use empty list
    const segments: TranscriptSegment[] = [];

    // Cache fallback transcript as well to keep it uniform
    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      fs.writeFileSync(cachePath, JSON.stringify(segments, null, 2));
    } catch (e) {
      // ignore cache save errors
    }

    return segments;
  }
}
