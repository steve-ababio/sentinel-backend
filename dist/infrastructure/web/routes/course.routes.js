"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const course_controller_1 = require("../controllers/course.controller");
const joi_1 = __importDefault(require("joi"));
const koa_joi_validate_1 = require("../util/koa-joi-validate");
const types_1 = require("@common/global/types");
const middleware_1 = require("../middleware/middleware");
const courseController = tsyringe_1.container.resolve(course_controller_1.CourseController);
const adminMiddleware = tsyringe_1.container.resolve(middleware_1.AdminMiddleware);
const adminGuard = adminMiddleware.adminGuard.bind(adminMiddleware);
const courseRouter = new koa_router_1.default();
exports.courseRouter = courseRouter;
courseRouter.post("/", adminGuard, (0, koa_joi_validate_1.validateRequest)({
    body: {
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        thumbnail: joi_1.default.string().required(),
        isPopular: joi_1.default.boolean().required(),
        difficulty: joi_1.default.any().valid(...Object.values(types_1.CourseLevel)).required(),
        pricingModel: joi_1.default.any().valid(...Object.values(types_1.PricingModel)).required(),
        price: joi_1.default.number().required(),
        specialization: joi_1.default.string().optional(),
        enrolledCount: joi_1.default.number().optional(),
        approvalRate: joi_1.default.number().optional(),
        languages: joi_1.default.array().items(joi_1.default.string()).optional(),
        skillsGained: joi_1.default.array().items(joi_1.default.string()).optional(),
        expectedExperience: joi_1.default.array().items(joi_1.default.string()).optional(),
        instructorId: joi_1.default.string().guid().optional().allow(null, ""),
    }
}), async (ctx) => await courseController.createCourse(ctx));
courseRouter.patch("/:id", adminGuard, (0, koa_joi_validate_1.validateRequest)({
    body: {
        title: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        thumbnail: joi_1.default.string().optional(),
        isPopular: joi_1.default.boolean().optional(),
        skillsGained: joi_1.default.array().items(joi_1.default.string()).optional(),
        expectedExperience: joi_1.default.array().items(joi_1.default.string()).optional(),
        instructorId: joi_1.default.string().guid().optional().allow(null, ""),
    }
}), (ctx) => courseController.updateCourse(ctx));
courseRouter.get("/:id/league", (ctx) => courseController.getLeagueTable(ctx));
courseRouter.delete("/:id", adminGuard, (ctx) => courseController.deleteCourse(ctx));
