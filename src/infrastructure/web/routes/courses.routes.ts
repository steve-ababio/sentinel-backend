import Router from "koa-router";
import { container } from "tsyringe";
import { CourseController } from "../controllers/course.controller";


const courseController = container.resolve(CourseController);
const coursesRouter = new Router();
coursesRouter.get("/", (ctx) => courseController.findAllCourses(ctx));
coursesRouter.get("/:id", (ctx) => courseController.findCourseById(ctx));

export { coursesRouter };
