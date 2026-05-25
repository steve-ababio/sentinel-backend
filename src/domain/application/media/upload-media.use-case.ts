import { injectable, inject } from "tsyringe";
import { UploadMediaPort } from "@ports/in/media/upload-media.port";
import { FileStoragePort } from "@ports/out/storage/file-storage.port";
import { createLogger } from "@infrastructure/web/util/logger";
import { RouteError } from "@infrastructure/web/util/route-error";
import { STATUS_CODES } from "@common/web/status-codes";

const logger = createLogger('USE_CASE', 'UPLOAD_MEDIA');

@injectable()
export class UploadMediaUseCase implements UploadMediaPort {
    constructor(
        @inject("FileStoragePort") private fileStoragePort: FileStoragePort
    ) {}

    async uploadMedia(file: any, folder?: string): Promise<{ url: string; key: string }> {
        if (!file) {
            throw new RouteError(STATUS_CODES.BAD_REQUEST, "File is required");
        }
        try {
            logger.info(`Uploading file ${file.originalname} to folder ${folder || 'root'}`);
            const result = await this.fileStoragePort.uploadFile(file, folder);
            logger.info(`File uploaded successfully: ${result.key}`);
            return result;
        } catch (error) {
            logger.error(`Error uploading file: ${error}`);
            throw new RouteError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to upload file");
        }
    }
}
