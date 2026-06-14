import Router from "koa-router";
import { container } from "tsyringe";
import { InstructorController } from "../controllers/instructor.controller";
import { AdminMiddleware } from "../middleware/middleware";

const instructorRouter = new Router();
const instructorController = container.resolve(InstructorController);
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);

instructorRouter.post("/", adminGuard, (ctx) => instructorController.createInstructor(ctx));
instructorRouter.patch("/:id", adminGuard, (ctx) => instructorController.updateInstructor(ctx));
instructorRouter.get("/:id", (ctx) => instructorController.getInstructor(ctx));
instructorRouter.delete("/:id", adminGuard, (ctx) => instructorController.deleteInstructor(ctx));
instructorRouter.get("/", (ctx) => instructorController.list(ctx));

export { instructorRouter };
