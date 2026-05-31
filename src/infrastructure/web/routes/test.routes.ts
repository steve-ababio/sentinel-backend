import Router from "koa-router";
import { TestController } from "../controllers/test.controller";

const testRouter = new Router();
const testController = new TestController();

testRouter.get("/module/:moduleId", (ctx) => testController.getTestByModule(ctx));
testRouter.get("/course/:courseId/submissions", (ctx) => testController.getCourseSubmissions(ctx));
testRouter.post("/:testId/submit", (ctx) => testController.submitTest(ctx));

export { testRouter };
