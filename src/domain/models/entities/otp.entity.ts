import { IdentifierType, OtpStatus } from "@common/auth/enum";

export class OtpEntity {
    constructor(
        public userId: string | null,
        public identifier: string,
        public identifierType: IdentifierType,
        public status: OtpStatus,
        public expiresAt: Date,
        public code: string,
        public attempts: number,
        public id?: string ,
    ) { }


    static newInstance(otpCode: string, identifierType: IdentifierType, userId: string, identifier: string) {
        return new OtpEntity(
            userId,
            identifier,
            identifierType,
            OtpStatus.ACTIVE,
            this.getExpiry(parseInt(process.env.OTP_EXPIRY_MINUTES as string,10)),
            otpCode,
            0,

        );
    }
    
    static getExpiry(duration: number) {
        return new Date(new Date().getTime() + duration * 60000);
    }

}