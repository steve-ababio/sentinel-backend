import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "../user/user.entity";
import { BaseEntity } from '../base/base.entity';

@Entity('user-card') 
export class UserCard extends BaseEntity {
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    public user!: User;


    @Column({
        name: 'card_token',
        type: 'varchar',
        unique: true
    })
    cardToken!: string;

    @Column({
        name: 'last4',
        type:'varchar',
        length: 4
    })
    last4!: string;

    @Column({
        name: 'brand',
        type: 'varchar'
    })
    brand!: string; // Visa, Mastercard

    @Column({
        name: 'exp_month',
        type: 'int'
    })
    expMonth!: number;

    @Column({
        name: 'exp_year',
        type: 'int'
    })
    expYear!: number;

    @Column({
        name: "is_default",
        default: false
    })
    isDefault!: boolean;
}