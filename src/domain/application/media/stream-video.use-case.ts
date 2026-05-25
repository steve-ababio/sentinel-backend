import { StreamVideoPort, StreamVideoResponse } from "@ports/in/media/stream-video.port";
import { FileStoragePort } from "@ports/out/storage/file-storage.port";
import { inject, injectable } from "tsyringe";

@injectable()
export class StreamVideoUseCase implements StreamVideoPort {
    constructor(
        @inject("FileStoragePort") private readonly fileStoragePort: FileStoragePort
    ) {}

    async streamVideo(fileKey: string, range?: string): Promise<StreamVideoResponse> {
        if (!fileKey) {
            throw new Error("File key is required");
        }

        // If fileKey is a full S3 URL, extract the key part.
        // Format: https://{bucketName}.s3.{region}.amazonaws.com/{key}
        let actualKey = fileKey;
        if (actualKey.startsWith("http://") || actualKey.startsWith("https://")) {
            try {
                const urlObj = new URL(actualKey);
                // urlObj.pathname includes a leading slash, e.g., "/folder/file.mp4"
                actualKey = decodeURIComponent(urlObj.pathname.substring(1));
                console.log('actual key: ', actualKey)
            } catch (e) {
                // If parsing fails, use the original string
            }
        }

        return this.fileStoragePort.streamFile(actualKey, range);
    }
}
