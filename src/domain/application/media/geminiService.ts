import { injectable } from "tsyringe";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import fs from "fs";
import { TranscriptSegment } from "./transcriptionService";

@injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async transcribeAudio(audioPath: string): Promise<TranscriptSegment[]> {
    if (!this.genAI) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }

    // Define response schema for structured JSON output
    const responseSchema = {
      type: SchemaType.ARRAY,
      description: "List of transcript segments with start and end timestamps in seconds.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          start: {
            type: SchemaType.INTEGER,
            description: "Start time of this segment in seconds.",
          },
          end: {
            type: SchemaType.INTEGER,
            description: "End time of this segment in seconds.",
          },
          text: {
            type: SchemaType.STRING,
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
        responseSchema: responseSchema as any,
      },
    });

    console.log("Transcribing audio using Gemini 1.5 Flash...");
    const audioData = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(audioPath)).toString("base64"),
        mimeType: "audio/mp3",
      },
    };

    const prompt = "Transcribe the following audio file. Return a JSON list of all spoken segments, each containing their start and end timestamps in seconds and the text spoken.";
    const result = await model.generateContent([prompt, audioData]);
    const responseText = result.response.text();
    
    if (responseText) {
      const parsed = JSON.parse(responseText);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => ({
          start: typeof item.start === 'number' ? Math.round(item.start) : 0,
          end: typeof item.end === 'number' ? Math.round(item.end) : 10,
          text: String(item.text || "").trim(),
        }));
      }
    }

    return [];
  }
}
