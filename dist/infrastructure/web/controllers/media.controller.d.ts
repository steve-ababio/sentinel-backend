import { StreamVideoPort } from "@ports/in/media/stream-video.port";
import { UploadMediaPort } from "@ports/in/media/upload-media.port";
import { TranscriptionService } from "@domain/application/media/transcriptionService";
export declare class MediaController {
    private streamVideoPort;
    private uploadMediaPort;
    private transcriptionService;
    constructor(streamVideoPort: StreamVideoPort, uploadMediaPort: UploadMediaPort, transcriptionService: TranscriptionService);
    streamVideo(ctx: any): Promise<void>;
    uploadMedia(ctx: any): Promise<void>;
    generateUploadUrl(ctx: any): Promise<void>;
    uploadLocal(ctx: any): Promise<void>;
    streamTranscript(ctx: any): Promise<void>;
}
