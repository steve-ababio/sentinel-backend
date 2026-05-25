import Router from "koa-router";
import { container } from "tsyringe";
import { LessonController } from "../controllers/lesson.controller";
import { validateRequest } from "../util/koa-joi-validate";
import Joi from "joi";
import { CourseLevel } from "@common/global/types";

const lessonRouter = new Router();
const lessonController = container.resolve(LessonController);

lessonRouter.post("/",
    validateRequest({
        body:{
            title:Joi.string().required(),
            description:Joi.string().required(),
            duration: Joi.number().required(),
            videoUrl:Joi.string().required(),
            notes:Joi.string().optional(),
            moduleId:Joi.string().uuid().required(),
            order:Joi.number().required(),
        }
    }),
     async (ctx) => lessonController.createLesson(ctx));
lessonRouter.get("/module/:moduleId", (ctx) => lessonController.findLessonsByModule(ctx));
lessonRouter.get("/course/:courseId/count", (ctx) => lessonController.countLessonsByCourse(ctx));
lessonRouter.get("/:lessonId/previous", (ctx) => lessonController.findPreviousLesson(ctx));
lessonRouter.get("/:lessonId/next", (ctx) => lessonController.findNextLesson(ctx));
lessonRouter.get("/:id", (ctx) => lessonController.findLessonById(ctx));
lessonRouter.delete("/:id", (ctx) => lessonController.deleteLesson(ctx));

export { lessonRouter };
