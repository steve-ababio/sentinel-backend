import Router from "koa-router";
import { container } from "tsyringe";
import { MediaController } from "../controllers/media.controller";
import multer from "@koa/multer";
import { AdminMiddleware } from "../middleware/middleware";

const mediaRouter = new Router();
const mediaController = container.resolve(MediaController);
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);

const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } }); // 50 MB limit

mediaRouter.get("/stream/:videoId", (ctx) => mediaController.streamVideo(ctx));
mediaRouter.post("/upload", adminGuard as any, upload.single("file") as any, (ctx: any) => mediaController.uploadMedia(ctx));
mediaRouter.get("/transcript/:lessonId/stream", (ctx) => mediaController.streamTranscript(ctx));

export { mediaRouter };
