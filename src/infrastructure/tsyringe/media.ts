import { container } from "tsyringe";

import { FileStoragePort } from "@ports/out/storage/file-storage.port";
import { S3FileStorageAdapter } from "@infrastructure/aws/s3-file-storage.adapter";

import { StreamVideoPort } from "@ports/in/media/stream-video.port";
import { StreamVideoUseCase } from "@domain/application/media/stream-video.use-case";

import { UploadMediaPort } from "@ports/in/media/upload-media.port";
import { UploadMediaUseCase } from "@domain/application/media/upload-media.use-case";

container.register<FileStoragePort>("FileStoragePort", {
    useClass: S3FileStorageAdapter
});

container.register<StreamVideoPort>("StreamVideoPort", {
    useClass: StreamVideoUseCase
});

container.register<UploadMediaPort>("UploadMediaPort", {
    useClass: UploadMediaUseCase
});
