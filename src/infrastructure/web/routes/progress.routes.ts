import Router from "koa-router";
import { container } from "tsyringe";
import { ProgressController } from "../controllers/progress.controller";

const progressRouter = new Router();
const progressController = container.resolve(ProgressController);

progressRouter.post("/:lessonId", (ctx) => progressController.saveProgress(ctx));
progressRouter.patch("/:id", (ctx) => progressController.updateProgress(ctx));
progressRouter.get("/course/:courseId", (ctx) => progressController.findCourseProgress(ctx));
progressRouter.get("/course/:courseId/last-watched", (ctx) => progressController.getLastWatchedLesson(ctx));
progressRouter.get("/lesson/:lessonId/course/:courseId", (ctx) => progressController.findProgressByLesson(ctx));

export { progressRouter };
