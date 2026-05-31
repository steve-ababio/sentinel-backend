import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Course } from "../course/course.entity";
import { Column } from "typeorm";
import { TransactionStatus, TransactionType } from "@common/global/types";
import { CurrencyCodes, PaymentMode, UniqueCurrencies } from "@common/user/enum";
import { BaseEntity } from "../base/base.entity";

@Entity('transaction')
export class Transaction extends BaseEntity{

    @Column()
    amount!: number;

    @Column({
        type: 'enum',
        enum: UniqueCurrencies,
    })
    currency!: CurrencyCodes;
    
    @Column({
        name: 'payment_mode',
        type: 'enum',
        enum: PaymentMode,
        nullable: true,
    })
    public paymentMode!: PaymentMode | null;

    @Column()
    provider!: string;

    @Column()
    providerRef!: string;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.INITIATED,
    })
    status!: TransactionStatus;

    @Column({
        name: 'transaction_type',
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.PAYMENT
    })
    public transactionType!: TransactionType;

    @Column({
        name: 'card_brand',
        type: 'varchar',
        nullable: true,
    })
    public cardBrand!: string | null;

    @Column({
        name: 'card_last4',
        type: 'varchar',
        nullable: true,
    })
    public cardLast4!: string | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Course, { nullable: true })
    @JoinColumn({ name: 'course_id' })
    course!: Course | null;
}