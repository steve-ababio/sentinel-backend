import { PaystackPaymentPort } from '@ports/out/payment/paystack.payment';
export declare class PaystackPaymentService implements PaystackPaymentPort {
    private readonly paystackBaseUrl;
    private readonly paystackSecretKey;
    initiatePayment(amount: number, orderCode: string, email: string, currency?: string): Promise<string>;
    verifyPayment(reference: string): Promise<any>;
    chargeCard(card: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
    chargeAuthorization(authorization_code: string, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
    chargeMobileMoney(mobileMoney: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any>;
}
