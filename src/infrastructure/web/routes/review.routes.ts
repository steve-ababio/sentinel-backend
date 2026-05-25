import Router from "koa-router";
import { container } from "tsyringe";
import { ReviewController } from "../controllers/review.controller";

const reviewRouter = new Router();
const reviewController = container.resolve(ReviewController);

reviewRouter.get("/course/:courseId", (ctx) => reviewController.findReviewsByCourse(ctx));
reviewRouter.get("/course/:courseId/stats", (ctx) => reviewController.getCourseReviewStats(ctx));

export { reviewRouter };
