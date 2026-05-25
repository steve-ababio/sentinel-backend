import { Column, CreateDateColumn, Entity, Index, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { SubscriptionStatus } from "@common/global/types";
import { Plan } from "../plan/plan.entity";
import { User } from "../user/user.entity";

@Entity('subscription')
export class Subscription extends BaseEntity {

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Plan, (p) => p.subscriptions)
  plan!: Plan;

  @Column() @Index()
  transactionId!: string;
  
  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
  })
  status!: SubscriptionStatus;

  @Column({ nullable: true })
  trialEndsAt!: Date;

  @CreateDateColumn()
  subscribedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;
}