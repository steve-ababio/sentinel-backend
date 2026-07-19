"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileStorageAdapter = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const tsyringe_1 = require("tsyringe");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let S3FileStorageAdapter = class S3FileStorageAdapter {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION || "us-east-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
            }
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
    }
    async streamFile(fileKey, range) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            Range: range,
        });
        const response = await this.s3Client.send(command);
        return {
            stream: response.Body,
            contentType: response.ContentType || "video/mp4",
            contentLength: response.ContentLength || 0,
            contentRange: response.ContentRange,
            acceptRanges: response.AcceptRanges,
            statusCode: range && response.ContentRange ? 206 : 200
        };
    }
    async uploadFile(file, folder) {
        const uniqueId = crypto_1.default.randomUUID();
        const filename = `${uniqueId}-${file.originalname}`;
        const key = folder ? `${folder}/${filename}` : filename;
        try {
            const command = new client_s3_1.PutObjectCommand({
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
        catch (error) {
            console.error("AWS S3 upload failed, falling back to local storage:", error);
            const uploadsDir = path_1.default.join(process.cwd(), "uploads");
            if (!fs_1.default.existsSync(uploadsDir)) {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            const filepath = path_1.default.join(uploadsDir, filename);
            fs_1.default.writeFileSync(filepath, file.buffer);
            const url = `/api-backend/admin/uploads/${filename}`;
            return { url, key: filename };
        }
    }
    async generatePresignedUploadUrl(fileName, contentType, folder) {
        const uniqueId = crypto_1.default.randomUUID();
        const filename = `${uniqueId}-${fileName}`;
        const key = folder ? `${folder}/${filename}` : filename;
        const isS3Configured = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_S3_BUCKET_NAME;
        if (isS3Configured) {
            try {
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    ContentType: contentType,
                });
                const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 });
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
            }
            catch (error) {
                console.error("AWS S3 presigned URL generation failed, falling back to local:", error);
            }
        }
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
};
exports.S3FileStorageAdapter = S3FileStorageAdapter;
exports.S3FileStorageAdapter = S3FileStorageAdapter = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], S3FileStorageAdapter);
