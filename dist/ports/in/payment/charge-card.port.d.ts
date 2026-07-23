export interface ChargeCardPort {
    chargeCard(userId: string, cardDetails: any, amount: number, courseId: string): Promise<any>;
}
