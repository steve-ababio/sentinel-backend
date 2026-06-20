import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileStoragePort, StreamResponse } from "@ports/out/storage/file-storage.port";
import { Readable } from "stream";
import { injectable } from "tsyringe";
import crypto from "crypto";
import fs from "fs";
import path from "path";

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
        const filename = `${uniqueId}-${file.originalname}`;
        const key = folder ? `${folder}/${filename}` : filename;
        
        try {
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
        } catch (error) {
            console.error("AWS S3 upload failed, falling back to local storage:", error);
            
            // Save locally
            const uploadsDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            
            const filepath = path.join(uploadsDir, filename);
            fs.writeFileSync(filepath, file.buffer);
            
            const url = `/api-backend/admin/uploads/${filename}`;
            return { url, key: filename };
        }
    }

    async generatePresignedUploadUrl(fileName: string, contentType: string, folder?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
        method: string;
        headers: Record<string, string>;
    }> {
        const uniqueId = crypto.randomUUID();
        const filename = `${uniqueId}-${fileName}`;
        const key = folder ? `${folder}/${filename}` : filename;

        const isS3Configured = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET_NAME;

        if (isS3Configured) {
            try {
                const command = new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    ContentType: contentType,
                });

                const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                const region = await this.s3Client.config.region();
                const publicUrl = `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;

                return {
                    uploadUrl,
                    publicUrl,
                    key,
                    method: "PUT",
                    headers: {
                        "Content-Type": contentType,
                    },
                };
            } catch (error) {
                console.error("AWS S3 presigned URL generation failed, falling back to local:", error);
            }
        }

        // Local fallback:
        // Returns a local path for client to PUT the file. The client must route this via the local API.
        const uploadUrl = `/media/upload-local/${filename}`;
        const publicUrl = `/api-backend/admin/uploads/${filename}`;

        return {
            uploadUrl,
            publicUrl,
            key: filename,
            method: "PUT",
            headers: {
                "Content-Type": contentType,
            },
        };
    }
}

