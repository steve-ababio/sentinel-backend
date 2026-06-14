import Router from "koa-router";
import { container } from "tsyringe";
import { EnrollmentController } from "../controllers/enrollment.controller";

const enrollmentController = container.resolve(EnrollmentController);
const enrollmentRouter = new Router();

enrollmentRouter.post("/", (ctx) => enrollmentController.createEnrollment(ctx));
enrollmentRouter.patch("/complete", (ctx) => enrollmentController.completeEnrollment(ctx));
enrollmentRouter.get("/search", (ctx) => enrollmentController.findEnrollmentByIds(ctx)); // using query params userId and courseId
enrollmentRouter.get("/user", (ctx) => enrollmentController.findAllEnrollmentsByUser(ctx));

export { enrollmentRouter };
