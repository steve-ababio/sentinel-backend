export interface UploadMediaPort {
    uploadMedia(file: any, folder?: string): Promise<{ url: string; key: string }>;
}
