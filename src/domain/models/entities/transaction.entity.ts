import { TransactionStatus, TransactionType } from "@common/global/types";
import { CurrencyCodes, PaymentMode } from "@common/user/enum";
import { UserEntity } from "./user.entity";

export class TransactionEntity {
  constructor(
    public amount: number,
    public currency: CurrencyCodes,
    public paymentMode: PaymentMode | null,
    public provider: string,
    public providerRef: string,
    public status: TransactionStatus,
    public transactionType: TransactionType,
    public id?: string,
    public userId?: string,
    public createdAt?: Date
  ) {}
}
