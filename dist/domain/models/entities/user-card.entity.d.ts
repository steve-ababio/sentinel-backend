export declare class UserCardEntity {
    userId: string;
    cardToken: string;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
    id?: string | undefined;
    constructor(userId: string, cardToken: string, last4: string, brand: string, expMonth: number, expYear: number, isDefault: boolean, id?: string | undefined);
}
