"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const review_controller_1 = require("../controllers/review.controller");
const reviewRouter = new koa_router_1.default();
exports.reviewRouter = reviewRouter;
const reviewController = tsyringe_1.container.resolve(review_controller_1.ReviewController);
reviewRouter.get("/course/:courseId", (ctx) => reviewController.findReviewsByCourse(ctx));
reviewRouter.get("/course/:courseId/stats", (ctx) => reviewController.getCourseReviewStats(ctx));
reviewRouter.post("/course/:courseId", (ctx) => reviewController.createReview(ctx));
