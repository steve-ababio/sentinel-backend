import { Readable } from "stream";

export interface StreamResponse {
  stream: Readable;
  contentType: string;
  contentLength: number;
  contentRange?: string;
  acceptRanges?: string;
  statusCode: number;
}

export interface FileStoragePort {
    streamFile(fileKey: string, range?: string): Promise<StreamResponse>;
    uploadFile(file: any, folder?: string): Promise<{ url: string; key: string }>;
}
