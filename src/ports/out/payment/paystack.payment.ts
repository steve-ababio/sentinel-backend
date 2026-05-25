import { CurrencyCodes } from "@common/user/enum";

export interface PaystackPaymentPort {
    initiatePayment(amount: number, orderCode: string, email: string,currency?: CurrencyCodes): Promise<string>;
    verifyPayment(reference: string): Promise<any>;
    chargeCard(card: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
    chargeAuthorization(authorization_code: string, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
    chargeMobileMoney(mobileMoney: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
}