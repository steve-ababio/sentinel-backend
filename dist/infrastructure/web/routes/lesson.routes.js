"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const lesson_controller_1 = require("../controllers/lesson.controller");
const koa_joi_validate_1 = require("../util/koa-joi-validate");
const joi_1 = __importDefault(require("joi"));
const middleware_1 = require("../middleware/middleware");
const lessonRouter = new koa_router_1.default();
exports.lessonRouter = lessonRouter;
const lessonController = tsyringe_1.container.resolve(lesson_controller_1.LessonController);
const adminMiddleware = tsyringe_1.container.resolve(middleware_1.AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);
lessonRouter.post("/", adminGuard, (0, koa_joi_validate_1.validateRequest)({
    body: {
        id: joi_1.default.string().uuid().optional(),
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        duration: joi_1.default.number().required(),
        videoUrl: joi_1.default.string().required(),
        notes: joi_1.default.string().optional(),
        moduleId: joi_1.default.string().uuid().required(),
        order: joi_1.default.number().required(),
        resources: joi_1.default.array().items(joi_1.default.any()).optional(),
    }
}), async (ctx) => lessonController.createLesson(ctx));
lessonRouter.get("/module/:moduleId", (ctx) => lessonController.findLessonsByModule(ctx));
lessonRouter.get("/course/:courseId/count", (ctx) => lessonController.countLessonsByCourse(ctx));
lessonRouter.get("/:lessonId/previous", (ctx) => lessonController.findPreviousLesson(ctx));
lessonRouter.get("/:lessonId/next", (ctx) => lessonController.findNextLesson(ctx));
lessonRouter.get("/:id", (ctx) => lessonController.findLessonById(ctx));
lessonRouter.delete("/:id", adminGuard, (ctx) => lessonController.deleteLesson(ctx));
