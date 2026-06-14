import Router from "koa-router";
import { container } from "tsyringe";
import { ModuleController } from "../controllers/module.controller";
import { AdminMiddleware } from "../middleware/middleware";

const moduleRouter = new Router();
const moduleController = container.resolve(ModuleController);
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);

moduleRouter.post("/", adminGuard, (ctx) => moduleController.saveModule(ctx));
moduleRouter.get("/:id", (ctx) => moduleController.findModuleById(ctx));
moduleRouter.delete("/:id", adminGuard, (ctx) => moduleController.deleteModule(ctx));
moduleRouter.get("/course/:courseId", (ctx) => moduleController.findModulesByCourse(ctx));

export { moduleRouter };