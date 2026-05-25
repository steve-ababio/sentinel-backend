import Router from "koa-router";
import { container } from "tsyringe";
import { InstructorController } from "../controllers/instructor.controller";

const instructorRouter = new Router();
const instructorController = container.resolve(InstructorController);

instructorRouter.post("/", (ctx) => instructorController.createInstructor(ctx));
instructorRouter.patch("/:id", (ctx) => instructorController.updateInstructor(ctx));
instructorRouter.get("/:id", (ctx) => instructorController.getInstructor(ctx));
instructorRouter.delete("/:id", (ctx) => instructorController.deleteInstructor(ctx));
instructorRouter.get("/", (ctx) => instructorController.list(ctx));

export { instructorRouter };
