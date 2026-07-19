import { UploadMediaPort } from "@ports/in/media/upload-media.port";
import { FileStoragePort } from "@ports/out/storage/file-storage.port";
export declare class UploadMediaUseCase implements UploadMediaPort {
    private fileStoragePort;
    constructor(fileStoragePort: FileStoragePort);
    uploadMedia(file: any, folder?: string): Promise<{
        url: string;
        key: string;
    }>;
    generateUploadUrl(fileName: string, contentType: string, folder?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
        method: string;
        headers: Record<string, string>;
    }>;
}
