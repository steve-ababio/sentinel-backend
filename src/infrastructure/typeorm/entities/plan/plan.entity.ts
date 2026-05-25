import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CurrencyCodes, UniqueCurrencies } from "@common/user/enum";
import { Subscription } from "../subscription/subscription.entity";

@Entity('plan')
export class Plan extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({
    type: 'enum',
    enum: UniqueCurrencies,
  })
  currency!: CurrencyCodes;

  @Column()
  interval!: string; // monthly, yearly

  @Column({ default: 0 })
  trialDays!: number;

  @OneToMany(() => Subscription, (s) => s.plan)
  subscriptions!: Subscription[];
}