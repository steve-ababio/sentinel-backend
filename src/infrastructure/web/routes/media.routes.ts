import Router from "koa-router";
import { container } from "tsyringe";
import { MediaController } from "../controllers/media.controller";
import multer from "@koa/multer";

const mediaRouter = new Router();
const mediaController = container.resolve(MediaController);

const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } }); // 50 MB limit

mediaRouter.get("/stream/:videoId", (ctx) => mediaController.streamVideo(ctx));
mediaRouter.post("/upload", upload.single("file"), (ctx) => mediaController.uploadMedia(ctx));
mediaRouter.get("/transcript/:lessonId/stream", (ctx) => mediaController.streamTranscript(ctx));

export { mediaRouter };
