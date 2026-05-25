import Router from "koa-router";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../util/koa-joi-validate";
import Joi from "joi";

const authController = container.resolve(AuthController);
const authRouter = new Router();

authRouter.post("/register",
    validateRequest({
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    async(ctx) => await authController.register(ctx)
);

authRouter.post("/login", 
    validateRequest({
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
async(ctx) => await authController.login(ctx)
);
authRouter.post("/google", async(ctx) => await authController.authenticateViaGoogle(ctx));
authRouter.post("/request-reset-password",
    validateRequest({
        body: {
              identifier: Joi.string().required()
        },
    }),
    async (ctx) => {
        await authController.requestResetPassword(ctx);
    },
);
authRouter.post("/reset-password",
    validateRequest({
        body: {
            token: Joi.string().required(),
            password: Joi.string().min(8).required(),
        },
    }),
    async (ctx) => await authController.resetPassword(ctx)
);
authRouter.post("/refresh-token", 
    async (ctx) => await authController.refreshToken(ctx)
);
authRouter.post("/logout", async (ctx) => authController.logout(ctx));

authRouter.post("/send-otp",async (ctx) => authController.sendOtp(ctx));
authRouter.post("/validate-otp", async (ctx) => await authController.validateOtp(ctx));

export { authRouter };
