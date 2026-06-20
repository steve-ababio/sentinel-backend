export interface UploadMediaPort {
    uploadMedia(file: any, folder?: string): Promise<{ url: string; key: string }>;
    generateUploadUrl(
        fileName: string,
        contentType: string,
        folder?: string
    ): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
        method: string;
        headers: Record<string, string>;
    }>;
}
