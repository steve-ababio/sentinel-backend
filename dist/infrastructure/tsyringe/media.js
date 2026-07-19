"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const s3_file_storage_adapter_1 = require("@infrastructure/aws/s3-file-storage.adapter");
const stream_video_use_case_1 = require("@domain/application/media/stream-video.use-case");
const upload_media_use_case_1 = require("@domain/application/media/upload-media.use-case");
tsyringe_1.container.register("FileStoragePort", {
    useClass: s3_file_storage_adapter_1.S3FileStorageAdapter
});
tsyringe_1.container.register("StreamVideoPort", {
    useClass: stream_video_use_case_1.StreamVideoUseCase
});
tsyringe_1.container.register("UploadMediaPort", {
    useClass: upload_media_use_case_1.UploadMediaUseCase
});
