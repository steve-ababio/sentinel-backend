import Router from "koa-router";
import { container } from "tsyringe";
import { UserController } from "../controllers/user.controller";

const userRouter = new Router();
const userController = container.resolve(UserController);

userRouter.post("/", (ctx) => userController.createUserInfo(ctx));
userRouter.patch("/", (ctx) => userController.updateUserInfo(ctx));
userRouter.get("/me", (ctx) => userController.getUserInfo(ctx));

export { userRouter };
