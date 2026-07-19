"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const auth_controller_1 = require("../controllers/auth.controller");
const koa_joi_validate_1 = require("../util/koa-joi-validate");
const joi_1 = __importDefault(require("joi"));
const authController = tsyringe_1.container.resolve(auth_controller_1.AuthController);
const authRouter = new koa_router_1.default();
exports.authRouter = authRouter;
authRouter.post("/register", (0, koa_joi_validate_1.validateRequest)({
    body: {
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    },
}), async (ctx) => await authController.register(ctx));
authRouter.post("/login", (0, koa_joi_validate_1.validateRequest)({
    body: {
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    },
}), async (ctx) => await authController.login(ctx));
authRouter.post("/google", async (ctx) => await authController.authenticateViaGoogle(ctx));
authRouter.post("/request-reset-password", (0, koa_joi_validate_1.validateRequest)({
    body: {
        identifier: joi_1.default.string().required()
    },
}), async (ctx) => {
    await authController.requestResetPassword(ctx);
});
authRouter.post("/reset-password", (0, koa_joi_validate_1.validateRequest)({
    body: {
        token: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required(),
    },
}), async (ctx) => await authController.resetPassword(ctx));
authRouter.post("/refresh-token", async (ctx) => await authController.refreshToken(ctx));
authRouter.post("/logout", async (ctx) => authController.logout(ctx));
authRouter.post("/send-otp", async (ctx) => authController.sendOtp(ctx));
authRouter.post("/validate-otp", async (ctx) => await authController.validateOtp(ctx));
