import { StreamVideoPort, StreamVideoResponse } from "@ports/in/media/stream-video.port";
import { FileStoragePort } from "@ports/out/storage/file-storage.port";
export declare class StreamVideoUseCase implements StreamVideoPort {
    private readonly fileStoragePort;
    constructor(fileStoragePort: FileStoragePort);
    streamVideo(fileKey: string, range?: string): Promise<StreamVideoResponse>;
}
