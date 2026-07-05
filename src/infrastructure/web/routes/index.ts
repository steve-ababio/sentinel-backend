 import "reflect-metadata";
import '../../tsyringe/container'
import Router from 'koa-router';
import { JwtMiddleware } from "../middleware/middleware";
import {container} from "tsyringe";
import { authRouter } from "./auth.routes";
import { courseRouter } from "./course.routes";
import { moduleRouter } from "./module.routes";
import { lessonRouter } from "./lesson.routes";
import { progressRouter } from "./progress.routes";
import { transactionRouter } from "./transaction.routes";
import { reviewRouter } from "./review.routes";
import { enrollmentRouter } from "./enrollment.routes";
import { userRouter } from "./user.routes";
import { mediaRouter } from "./media.routes";
import { paymentRouter } from "./payment.route";
import { paymentChargeRouter } from "./payment-charge.route";
import { testRouter } from "./test.routes";
import { instructorRouter } from "./instructor.route";
import { adminRouter } from "./admin.routes";
import { contactRouter } from "./contact.routes";
import { coursesRouter } from "./courses.routes";

const jwtMiddlewareInstance = container.resolve(JwtMiddleware);

const router = new Router();

router.use("/auth", authRouter.routes());
router.use("/payment", paymentRouter.routes());
router.use("/contact", contactRouter.routes());
router.use("/courses",coursesRouter.routes());
router.use(jwtMiddlewareInstance.jwtMiddleware.bind(jwtMiddlewareInstance));
router.use("/payment/charge", paymentChargeRouter.routes());
router.use("/course",courseRouter.routes());
router.use("/module",moduleRouter.routes());
router.use("/lesson",lessonRouter.routes());
router.use("/progress",progressRouter.routes());
router.use("/transaction",transactionRouter.routes());
router.use("/review", reviewRouter.routes());
router.use("/enrollment",enrollmentRouter.routes());
router.use("/user",userRouter.routes());
router.use("/media",mediaRouter.routes());
router.use("/instructor", instructorRouter.routes());
router.use("/admin", adminRouter.routes());
router.use("/test", testRouter.routes());

router.use(router.allowedMethods())
export { router }; 