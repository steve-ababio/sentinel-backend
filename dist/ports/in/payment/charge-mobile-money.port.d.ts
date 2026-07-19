export interface ChargeMobileMoneyPort {
    chargeMobileMoney(userId: string, email: string, mobileMoney: any, amount: number, courseId: string): Promise<any>;
}
