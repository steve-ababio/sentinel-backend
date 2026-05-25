import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { StreamVideoPort } from "@ports/in/media/stream-video.port";
import { UploadMediaPort } from "@ports/in/media/upload-media.port";

const logger = createLogger('CONTROLLER', 'MEDIA');

@injectable()
export class MediaController {

    constructor(
        @inject("StreamVideoPort") private streamVideoPort: StreamVideoPort,
        @inject("UploadMediaPort") private uploadMediaPort: UploadMediaPort
    ) {}
// figd_h1fui83ncAPsNANz47SIeTnav-hheQOaFnRrgEDq
    async streamVideo(ctx: any) {
        try {
            const { videoId } = ctx.params;
            const range = ctx.request.headers.range;
            const response = await this.streamVideoPort.streamVideo(videoId, range);
            if (response.contentRange) ctx.set("Content-Range", response.contentRange);
            if (response.acceptRanges) ctx.set("Accept-Ranges", response.acceptRanges);
            ctx.set("Content-Length", response.contentLength.toString());
            ctx.set("Content-Type", response.contentType);
            
            ctx.status = response.statusCode || STATUS_CODES.PARTIAL_CONTENT;
            ctx.body = response.stream;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async uploadMedia(ctx: any) {
        try {
            const file = ctx.request.file;
            const { folder } = ctx.request.body || {};
            const response = await this.uploadMediaPort.uploadMedia(file, folder);
            
            ctx.status = STATUS_CODES.OK;
            ctx.body = {
                message: "File uploaded successfully",
                data: response
            };
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
