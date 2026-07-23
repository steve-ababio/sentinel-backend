export interface ChargeMobileMoneyPort {
    chargeMobileMoney(userId: string, mobileMoney: any, amount: number, courseId: string): Promise<any>;
}
