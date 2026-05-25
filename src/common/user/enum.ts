import { countries } from 'countries-list';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}
export const Country = Object.keys(countries).reduce((acc, code) => {
    acc[code] = code;
    return acc;
}, {} as Record<string, string>
);

export type CountryCode = keyof typeof Country;

const Currencies = Object.keys(countries).reduce((acc, code) => {
    const currencies = countries[code as keyof typeof countries].currency;
    acc.push(...currencies);
    return acc;
},[] as string[]);

export const UniqueCurrencies = [...new Set(Currencies)];
export type CurrencyCodes = typeof UniqueCurrencies[number];

export enum IdentifierType {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
}
export enum ContactStatus {
    VERIFIED = 'VERIFIED',
    PENDING = 'PENDING',
    NOT_STARTED = 'NOT_STARTED',
}
  
export enum PaymentMode {
    MOBILE_MONEY = "MOBILE_MONEY",
    BANK = "BANK",
    CARD = "CARD",
}

export enum OtpValidationType {
  CONTACT_VALIDATION = 'CONTACT_VALIDATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  STUDENT_EMAIL_VALIDATION = 'STUDENT_EMAIL_VALIDATION',
}
