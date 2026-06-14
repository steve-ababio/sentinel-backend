import Router from "koa-router";
import { container } from "tsyringe";
import { LessonController } from "../controllers/lesson.controller";
import { validateRequest } from "../util/koa-joi-validate";
import Joi from "joi";
import { CourseLevel } from "@common/global/types";

import { AdminMiddleware } from "../middleware/middleware";

const lessonRouter = new Router();
const lessonController = container.resolve(LessonController);
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);

lessonRouter.post("/",
    adminGuard,

    validateRequest({
        body:{
            id:Joi.string().uuid().optional(),
            title:Joi.string().required(),
            description:Joi.string().required(),
            duration: Joi.number().required(),
            videoUrl:Joi.string().required(),
            notes:Joi.string().optional(),
            moduleId:Joi.string().uuid().required(),
            order:Joi.number().required(),
            resources: Joi.array().items(Joi.any()).optional(),
        }
    }),
     async (ctx) => lessonController.createLesson(ctx));
lessonRouter.get("/module/:moduleId", (ctx) => lessonController.findLessonsByModule(ctx));
lessonRouter.get("/course/:courseId/count", (ctx) => lessonController.countLessonsByCourse(ctx));
lessonRouter.get("/:lessonId/previous", (ctx) => lessonController.findPreviousLesson(ctx));
lessonRouter.get("/:lessonId/next", (ctx) => lessonController.findNextLesson(ctx));
lessonRouter.get("/:id", (ctx) => lessonController.findLessonById(ctx));
lessonRouter.delete("/:id", adminGuard, (ctx) => lessonController.deleteLesson(ctx));

export { lessonRouter };
