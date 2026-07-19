"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const course_controller_1 = require("../controllers/course.controller");
const courseController = tsyringe_1.container.resolve(course_controller_1.CourseController);
const coursesRouter = new koa_router_1.default();
exports.coursesRouter = coursesRouter;
coursesRouter.get("/", (ctx) => courseController.findAllCourses(ctx));
coursesRouter.get("/:id", (ctx) => courseController.findCourseById(ctx));
