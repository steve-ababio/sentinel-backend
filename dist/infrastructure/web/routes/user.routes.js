"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = new koa_router_1.default();
exports.userRouter = userRouter;
const userController = tsyringe_1.container.resolve(user_controller_1.UserController);
userRouter.post("/", (ctx) => userController.createUserInfo(ctx));
userRouter.patch("/", (ctx) => userController.updateUserInfo(ctx));
userRouter.get("/me", (ctx) => userController.getUserInfo(ctx));
