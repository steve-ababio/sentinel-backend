import { User } from "../user/user.entity";
import { Course } from "../course/course.entity";
import { TransactionStatus, TransactionType } from "@common/global/types";
import { CurrencyCodes, PaymentMode } from "@common/user/enum";
import { BaseEntity } from "../base/base.entity";
export declare class Transaction extends BaseEntity {
    amount: number;
    currency: CurrencyCodes;
    paymentMode: PaymentMode | null;
    provider: string;
    providerRef: string;
    status: TransactionStatus;
    transactionType: TransactionType;
    cardBrand: string | null;
    cardLast4: string | null;
    user: User;
    course: Course | null;
}
