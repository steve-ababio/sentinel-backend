export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
export declare const Country: Record<string, string>;
export type CountryCode = keyof typeof Country;
export declare const UniqueCurrencies: string[];
export type CurrencyCodes = typeof UniqueCurrencies[number];
export declare enum IdentifierType {
    EMAIL = "EMAIL",
    PHONE = "PHONE"
}
export declare enum ContactStatus {
    VERIFIED = "VERIFIED",
    PENDING = "PENDING",
    NOT_STARTED = "NOT_STARTED"
}
export declare enum PaymentMode {
    MOBILE_MONEY = "MOBILE_MONEY",
    BANK = "BANK",
    CARD = "CARD"
}
export declare enum OtpValidationType {
    CONTACT_VALIDATION = "CONTACT_VALIDATION",
    PASSWORD_RESET = "PASSWORD_RESET",
    STUDENT_EMAIL_VALIDATION = "STUDENT_EMAIL_VALIDATION"
}
