"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const module_controller_1 = require("../controllers/module.controller");
const middleware_1 = require("../middleware/middleware");
const moduleRouter = new koa_router_1.default();
exports.moduleRouter = moduleRouter;
const moduleController = tsyringe_1.container.resolve(module_controller_1.ModuleController);
const adminMiddleware = tsyringe_1.container.resolve(middleware_1.AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);
moduleRouter.post("/", adminGuard, (ctx) => moduleController.saveModule(ctx));
moduleRouter.get("/:id", (ctx) => moduleController.findModuleById(ctx));
moduleRouter.delete("/:id", adminGuard, (ctx) => moduleController.deleteModule(ctx));
moduleRouter.get("/course/:courseId", (ctx) => moduleController.findModulesByCourse(ctx));
