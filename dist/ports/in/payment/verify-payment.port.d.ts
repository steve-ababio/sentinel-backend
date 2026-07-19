export interface VerifyPaymentPort {
    verifyPayment(reference: string): Promise<any>;
}
