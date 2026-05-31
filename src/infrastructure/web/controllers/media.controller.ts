import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { StreamVideoPort } from "@ports/in/media/stream-video.port";
import { UploadMediaPort } from "@ports/in/media/upload-media.port";
import { PassThrough } from "stream";
import { manager } from "@infrastructure/typeorm/data-source";
import { Lesson } from "@infrastructure/typeorm/entities/lesson/lesson.entity";
import { TranscriptionService } from "@domain/application/media/transcriptionService";

const logger = createLogger('CONTROLLER', 'MEDIA');

@injectable()
export class MediaController {

    constructor(
        @inject("StreamVideoPort") private streamVideoPort: StreamVideoPort,
        @inject("UploadMediaPort") private uploadMediaPort: UploadMediaPort,
        private transcriptionService: TranscriptionService
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

    async streamTranscript(ctx: any) {
        try {
            const { lessonId } = ctx.params;
            const durationParam = ctx.query.duration;
            const clientDuration = durationParam ? parseFloat(durationParam) : null;

            ctx.request.socket.setKeepAlive(true);
            ctx.set({
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            });

            const stream = new PassThrough();
            ctx.body = stream;

            const lesson = await manager.findOne(Lesson, { where: { id: lessonId } });
            if (!lesson) {
                stream.write(`event: error\ndata: ${JSON.stringify({ message: "Lesson not found" })}\n\n`);
                stream.end();
                return;
            }

            const totalDurationSeconds = clientDuration || (lesson.duration * 60) || 60;

            const segments = await this.transcriptionService.getTranscript(
                lesson.id,
                lesson.title,
                lesson.notes || lesson.description || "",
                lesson.videoUrl || "",
                totalDurationSeconds
            );

            let index = 0;
            const sendNextSegment = () => {
                if (index >= segments.length) {
                    stream.write(`event: complete\ndata: ${JSON.stringify({ status: "done" })}\n\n`);
                    stream.end();
                    return;
                }

                const segment = segments[index];
                stream.write(`data: ${JSON.stringify(segment)}\n\n`);
                index++;

                setTimeout(sendNextSegment, 800);
            };

            sendNextSegment();

            ctx.req.on("close", () => {
                stream.end();
            });
            ctx.req.on("finish", () => {
                stream.end();
            });
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
