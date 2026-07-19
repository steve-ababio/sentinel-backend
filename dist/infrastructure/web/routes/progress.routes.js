"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const progress_controller_1 = require("../controllers/progress.controller");
const progressRouter = new koa_router_1.default();
exports.progressRouter = progressRouter;
const progressController = tsyringe_1.container.resolve(progress_controller_1.ProgressController);
progressRouter.post("/:lessonId", (ctx) => progressController.saveProgress(ctx));
progressRouter.patch("/:id", (ctx) => progressController.updateProgress(ctx));
progressRouter.get("/course/:courseId", (ctx) => progressController.findCourseProgress(ctx));
progressRouter.get("/course/:courseId/last-watched", (ctx) => progressController.getLastWatchedLesson(ctx));
progressRouter.get("/lesson/:lessonId/course/:courseId", (ctx) => progressController.findProgressByLesson(ctx));
