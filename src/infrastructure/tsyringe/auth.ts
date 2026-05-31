
import { RegisterUseCase } from "@domain/application/auth/register.use-case";
import { LoginUseCase } from "@domain/application/auth/login.use-case";
import { RegisterPort } from "@ports/in/auth/register.port";
import { LoginPort } from "@ports/in/auth/login.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { UserRepository } from "@infrastructure/typeorm/repository/user/user.repository";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { GoogleAuthStrategy } from "@infrastructure/google-auth/google-auth.strategy";
import { SendOtpUseCase } from "@domain/application/auth/send-otp.use-case";
import { GoogleAuthUseCase } from "@domain/application/auth/google-auth.use-case";
import { GoogleAuthPort } from "@ports/in/auth/google-auth.port";
import { AccountSessionActivityRepository } from "@infrastructure/typeorm/repository/account-session-activity/account-session-activity.repository";
import { CreateAccountSessionActivityUseCase } from "@domain/application/auth/create-account-session-activity.use-case";
import { OtpRepository } from "@infrastructure/typeorm/repository/otp/otp.repository";

import 'reflect-metadata';
import { container } from 'tsyringe';
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
import { SendEmailMailer } from "@infrastructure/smtp/emailers/send-email.emailer";
import { RequestPasswordResetUseCase } from "@domain/application/auth/request-password-reset.use-case";
import { RequestPasswordResetPort } from "@ports/in/auth/request-password-reset.port";
import { ResetPasswordPort } from "@ports/in/auth/reset-password.port";
import { ResetPasswordResetUseCase } from "@domain/application/auth/reset-password.use-case";
import { LogoutPort } from "@ports/in/auth/logout.port";
import { LogoutUseCase } from "@domain/application/auth/logout.use-case";
import { ValidateOtpPort } from "@ports/in/auth/validate-otp.port";
import { ValidateOtpUseCase } from "@domain/application/auth/validate-otp.use-case";
container.register<RegisterPort>('RegisterPort', {
    useClass: RegisterUseCase
})

container.register<LoginPort>('LoginPort', {
    useClass: LoginUseCase
})

container.register<AccountSessionActivityPersistencePort>("AccountSessionActivityPersistencePort", {
    useClass: AccountSessionActivityRepository
});

container.register<CreateAccountSessionActivityPort>("CreateAccountSessionActivityPort", {
    useClass: CreateAccountSessionActivityUseCase
});

container.register<OtpPersistencePort>("OtpPersistencePort", {
    useClass: OtpRepository
});

container.register<SendOtpPort>("SendOtpPort", {
    useClass: SendOtpUseCase
});

container.register("GoogleAuthStrategy", {
    useClass: GoogleAuthStrategy,
  });

  container.register<GoogleAuthPort>("GoogleAuthPort", {
    useClass: GoogleAuthUseCase
});

container.register<SendEmailNotificationPort>("SendEmailNotificationPort", {
    useClass: SendEmailMailer
});

container.register<RequestPasswordResetPort>("RequestPasswordResetPort", {
    useClass: RequestPasswordResetUseCase
});

container.register<ResetPasswordPort>("ResetPasswordPort", {
    useClass: ResetPasswordResetUseCase
});

container.register<LogoutPort>("LogoutPort", {
    useClass: LogoutUseCase
});

container.register<ValidateOtpPort>("ValidateOtpPort", {
    useClass: ValidateOtpUseCase
});