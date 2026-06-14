import Router from "koa-router";
import { container } from "tsyringe";
import { CourseController } from "../controllers/course.controller";
import Joi from "joi";
import { validateRequest } from "../util/koa-joi-validate";
import { CourseLevel, PricingModel } from "@common/global/types";

import { AdminMiddleware } from "../middleware/middleware";

const courseController = container.resolve(CourseController);
const adminMiddleware = container.resolve(AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);
const courseRouter = new Router();

courseRouter.post("/",   
    adminGuard,

    validateRequest({
        body:{
            title:Joi.string().required(),
            description:Joi.string().required(),
            thumbnail:Joi.string().required(),
            isPopular: Joi.boolean().required(), 
            difficulty: Joi.any().valid(...Object.values(CourseLevel)).required(),
            pricingModel: Joi.any().valid(...Object.values(PricingModel)).required(),
            price: Joi.number().required(),
            specialization: Joi.string().optional(),
            enrolledCount: Joi.number().optional(),
            approvalRate: Joi.number().optional(),
            languages: Joi.array().items(Joi.string()).optional(),
            skillsGained: Joi.array().items(Joi.string()).optional(),
            expectedExperience: Joi.array().items(Joi.string()).optional(),
            instructorId: Joi.string().guid().optional().allow(null, ""),
        }
    }),
    async(ctx) => await courseController.createCourse(ctx)
);
courseRouter.patch(
    "/:id", 
    adminGuard,
    validateRequest({
        body:{
            title:Joi.string().optional(),
            description:Joi.string().optional(),
            thumbnail:Joi.string().optional(),
            isPopular: Joi.boolean().optional(), 
            skillsGained: Joi.array().items(Joi.string()).optional(),
            expectedExperience: Joi.array().items(Joi.string()).optional(),
            instructorId: Joi.string().guid().optional().allow(null, ""),
        }
    }),
    (ctx) => courseController.updateCourse(ctx)
);

courseRouter.get("/", (ctx) => courseController.findAllCourses(ctx));
courseRouter.get("/:id", (ctx) => courseController.findCourseById(ctx));
courseRouter.get("/:id/league", (ctx) => courseController.getLeagueTable(ctx));
courseRouter.delete("/:id", adminGuard, (ctx) => courseController.deleteCourse(ctx));

export { courseRouter };
