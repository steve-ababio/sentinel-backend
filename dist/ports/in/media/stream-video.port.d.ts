import { Readable } from "stream";
export interface StreamVideoResponse {
    stream: Readable;
    contentType: string;
    contentLength: number;
    contentRange?: string;
    acceptRanges?: string;
    statusCode: number;
}
export interface StreamVideoPort {
    streamVideo(fileKey: string, range?: string): Promise<StreamVideoResponse>;
}
