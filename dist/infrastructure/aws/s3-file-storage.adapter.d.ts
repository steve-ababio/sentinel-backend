import { FileStoragePort, StreamResponse } from "@ports/out/storage/file-storage.port";
export declare class S3FileStorageAdapter implements FileStoragePort {
    private readonly s3Client;
    private readonly bucketName;
    constructor();
    streamFile(fileKey: string, range?: string): Promise<StreamResponse>;
    uploadFile(file: any, folder?: string): Promise<{
        url: string;
        key: string;
    }>;
    generatePresignedUploadUrl(fileName: string, contentType: string, folder?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
        method: string;
        headers: Record<string, string>;
    }>;
}
