import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FileStoragePort, StreamResponse } from "@ports/out/storage/file-storage.port";
import { Readable } from "stream";
import { injectable } from "tsyringe";
import crypto from "crypto";

@injectable()
export class S3FileStorageAdapter implements FileStoragePort {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION || "us-east-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
            }
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
    }

    async streamFile(fileKey: string, range?: string): Promise<StreamResponse> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            Range: range, // e.g., 'bytes=0-1048575'
        });

        const response = await this.s3Client.send(command);

        return {
            stream: response.Body as Readable,
            contentType: response.ContentType || "video/mp4",
            contentLength: response.ContentLength || 0,
            contentRange: response.ContentRange,
            acceptRanges: response.AcceptRanges,
            statusCode: range && response.ContentRange ? 206 : 200
        };
    }

    async uploadFile(file: any, folder?: string): Promise<{ url: string; key: string }> {
        const uniqueId = crypto.randomUUID();
        const key = folder ? `${folder}/${uniqueId}-${file.originalname}` : `${uniqueId}-${file.originalname}`;
        
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3Client.send(command);

        const region = await this.s3Client.config.region();
        const url = `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;

        return { url, key };
    }
}
