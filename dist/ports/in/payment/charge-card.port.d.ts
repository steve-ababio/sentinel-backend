export interface ChargeCardPort {
    chargeCard(userId: string, email: string, cardDetails: any, amount: number, courseId: string): Promise<any>;
}
