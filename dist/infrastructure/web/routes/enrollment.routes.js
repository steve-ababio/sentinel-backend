"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const enrollment_controller_1 = require("../controllers/enrollment.controller");
const enrollmentController = tsyringe_1.container.resolve(enrollment_controller_1.EnrollmentController);
const enrollmentRouter = new koa_router_1.default();
exports.enrollmentRouter = enrollmentRouter;
enrollmentRouter.post("/", (ctx) => enrollmentController.createEnrollment(ctx));
enrollmentRouter.patch("/complete", (ctx) => enrollmentController.completeEnrollment(ctx));
enrollmentRouter.get("/search", (ctx) => enrollmentController.findEnrollmentByIds(ctx));
enrollmentRouter.get("/user", (ctx) => enrollmentController.findAllEnrollmentsByUser(ctx));
