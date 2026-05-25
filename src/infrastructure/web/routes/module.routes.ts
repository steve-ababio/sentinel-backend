import Router from "koa-router";
import { container } from "tsyringe";
import { ModuleController } from "../controllers/module.controller";

const moduleRouter = new Router();
const moduleController = container.resolve(ModuleController);

moduleRouter.post("/", (ctx) => moduleController.saveModule(ctx));
moduleRouter.get("/:id", (ctx) => moduleController.findModuleById(ctx));
moduleRouter.delete("/:id", (ctx) => moduleController.deleteModule(ctx));
moduleRouter.get("/course/:courseId", (ctx) => moduleController.findModulesByCourse(ctx));

export { moduleRouter };