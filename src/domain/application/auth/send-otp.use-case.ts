import { IdentifierType } from "@common/auth/enum";
import { OtpEntity } from "@domain/models/entities/otp.entity";
import { createLogger } from "@infrastructure/web/util/logger";
import { generateOtpCode } from "@infrastructure/web/util/otp";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { autoInjectable, inject } from "tsyringe";
import {BaseResponse} from "@common/global/types";
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";


const logger = createLogger('USE_CASE', 'SENT_OTP');
const SENDER_ID = process.env.ARKESEL_SMS_SENDER_ID

@autoInjectable()
export class SendOtpUseCase implements SendOtpPort {
  constructor(
    @inject('OtpPersistencePort')
    private otpPersistencePort: OtpPersistencePort,
    @inject('UserPersistencePort')
    private userPersistencePort: UserPersistencePort,
    @inject('SendEmailNotificationPort')
    private sendEmailNotificationPort: SendEmailNotificationPort,
  ) { }


  async sendOtp(identifier: string, identifierType: IdentifierType, userId?: string): Promise<BaseResponse> {
    if (!userId && identifierType === IdentifierType.EMAIL) {
      const user = await this.userPersistencePort.findByEmail(identifier)
      userId = user?.id as string
    }
    await this.otpPersistencePort.invalidateActiveOtps(userId as string, identifierType);
    const code = generateOtpCode();

    const otp = OtpEntity.newInstance(btoa(code), identifierType, userId as string, identifier)
    await this.otpPersistencePort.save(otp);
    await this.sendOtpToUser(identifier, code, identifierType);
    return { success: true }
  }


  async sendOtpToUser(identifier: string, code: string, identifierType: IdentifierType) {
    if (identifierType === IdentifierType.EMAIL) {
        await this.sendEmailNotificationPort.sendOtpEmail(identifier, code);
      }
      
    // else {
    //   await this.sendSmsPort.sendSms({ recipients: [identifier], message: `Your OTP ${code}`, sender: SENDER_ID })
    // }

    logger.info(`Sending OTP ${code} to ${identifier}`);
  }


}