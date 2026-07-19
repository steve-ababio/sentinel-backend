"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const test_controller_1 = require("../controllers/test.controller");
const testRouter = new koa_router_1.default();
exports.testRouter = testRouter;
const testController = new test_controller_1.TestController();
testRouter.get("/module/:moduleId", (ctx) => testController.getTestByModule(ctx));
testRouter.get("/course/:courseId/submissions", (ctx) => testController.getCourseSubmissions(ctx));
testRouter.post("/:testId/submit", (ctx) => testController.submitTest(ctx));
