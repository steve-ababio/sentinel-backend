import Router from "koa-router";
import { container } from "tsyringe";
import { CourseController } from "../controllers/course.controller";
import Joi from "joi";
import { validateRequest } from "../util/koa-joi-validate";
import { CourseLevel, PricingModel } from "@common/global/types";

const courseController = container.resolve(CourseController);
const courseRouter = new Router();

courseRouter.post("/",   
    validateRequest({
        body:{
            title:Joi.string().required(),
            description:Joi.string().required(),
            thumbnail:Joi.number().required(),
            isPopular: Joi.boolean().required(), 
            difficulty: Joi.any().valid(...Object.values(CourseLevel)).required(),
            pricingModel: Joi.any().valid(...Object.values(PricingModel)).required(),
            price: Joi.number().required(),
            specialization: Joi.string().optional(),
            enrolledCount: Joi.number().optional(),
            approvalRate: Joi.number().optional(),
            languages: Joi.array().items(Joi.string()).optional(),
        }
    }),
    async(ctx) => await courseController.createCourse(ctx)
);
courseRouter.patch(
    "/:id", 
    validateRequest({
        body:{
            title:Joi.string().optional(),
            description:Joi.string().optional(),
            thumbnail:Joi.number().optional(),
            isPopular: Joi.boolean().optional(), 
        }
    }),
    (ctx) => courseController.updateCourse(ctx)
);

courseRouter.get("/", (ctx) => courseController.findAllCourses(ctx));
courseRouter.get("/:id", (ctx) => courseController.findCourseById(ctx));
courseRouter.get("/:id/league", (ctx) => courseController.getLeagueTable(ctx));
courseRouter.delete("/:id", (ctx) => courseController.deleteCourse(ctx));

export { courseRouter };
