import { injectable } from "tsyringe";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@injectable()
export class FfmpegService {
  
  async extractAudio(videoPath: string, outputAudioPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputDir = path.dirname(outputAudioPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      if (fs.existsSync(outputAudioPath)) {
        try {
          fs.unlinkSync(outputAudioPath);
        } catch (e) {
          // ignore
        }
      }
      console.log("video path: ",videoPath);
      console.log("output audio path: ",outputAudioPath);
      ffmpeg(videoPath)
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
}
