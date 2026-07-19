import { TransactionStatus, TransactionType } from "@common/global/types";
import { CurrencyCodes, PaymentMode } from "@common/user/enum";
export declare class TransactionEntity {
    amount: number;
    currency: CurrencyCodes;
    paymentMode: PaymentMode | null;
    provider: string;
    providerRef: string;
    status: TransactionStatus;
    transactionType: TransactionType;
    id?: string | undefined;
    userId?: string | undefined;
    createdAt?: Date | undefined;
    courseId?: string | undefined;
    cardBrand?: string | undefined;
    cardLast4?: string | undefined;
    courseTitle?: string | undefined;
    constructor(amount: number, currency: CurrencyCodes, paymentMode: PaymentMode | null, provider: string, providerRef: string, status: TransactionStatus, transactionType: TransactionType, id?: string | undefined, userId?: string | undefined, createdAt?: Date | undefined, courseId?: string | undefined, cardBrand?: string | undefined, cardLast4?: string | undefined, courseTitle?: string | undefined);
}
