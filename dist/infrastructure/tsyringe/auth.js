"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_use_case_1 = require("@domain/application/auth/register.use-case");
const login_use_case_1 = require("@domain/application/auth/login.use-case");
const google_auth_strategy_1 = require("@infrastructure/google-auth/google-auth.strategy");
const send_otp_use_case_1 = require("@domain/application/auth/send-otp.use-case");
const google_auth_use_case_1 = require("@domain/application/auth/google-auth.use-case");
const account_session_activity_repository_1 = require("@infrastructure/typeorm/repository/account-session-activity/account-session-activity.repository");
const create_account_session_activity_use_case_1 = require("@domain/application/auth/create-account-session-activity.use-case");
const otp_repository_1 = require("@infrastructure/typeorm/repository/otp/otp.repository");
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const send_email_emailer_1 = require("@infrastructure/smtp/emailers/send-email.emailer");
const request_password_reset_use_case_1 = require("@domain/application/auth/request-password-reset.use-case");
const reset_password_use_case_1 = require("@domain/application/auth/reset-password.use-case");
const logout_use_case_1 = require("@domain/application/auth/logout.use-case");
const validate_otp_use_case_1 = require("@domain/application/auth/validate-otp.use-case");
tsyringe_1.container.register('RegisterPort', {
    useClass: register_use_case_1.RegisterUseCase
});
tsyringe_1.container.register('LoginPort', {
    useClass: login_use_case_1.LoginUseCase
});
tsyringe_1.container.register("AccountSessionActivityPersistencePort", {
    useClass: account_session_activity_repository_1.AccountSessionActivityRepository
});
tsyringe_1.container.register("CreateAccountSessionActivityPort", {
    useClass: create_account_session_activity_use_case_1.CreateAccountSessionActivityUseCase
});
tsyringe_1.container.register("OtpPersistencePort", {
    useClass: otp_repository_1.OtpRepository
});
tsyringe_1.container.register("SendOtpPort", {
    useClass: send_otp_use_case_1.SendOtpUseCase
});
tsyringe_1.container.register("GoogleAuthStrategy", {
    useClass: google_auth_strategy_1.GoogleAuthStrategy,
});
tsyringe_1.container.register("GoogleAuthPort", {
    useClass: google_auth_use_case_1.GoogleAuthUseCase
});
tsyringe_1.container.register("SendEmailNotificationPort", {
    useClass: send_email_emailer_1.SendEmailMailer
});
tsyringe_1.container.register("RequestPasswordResetPort", {
    useClass: request_password_reset_use_case_1.RequestPasswordResetUseCase
});
tsyringe_1.container.register("ResetPasswordPort", {
    useClass: reset_password_use_case_1.ResetPasswordResetUseCase
});
tsyringe_1.container.register("LogoutPort", {
    useClass: logout_use_case_1.LogoutUseCase
});
tsyringe_1.container.register("ValidateOtpPort", {
    useClass: validate_otp_use_case_1.ValidateOtpUseCase
});
