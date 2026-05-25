import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { AccountSessionStatus } from "@common/auth/enum";
import { BaseEntity } from "../base/base.entity";

@Entity('account_session_activity')
export class AccountSessionActivity extends BaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Column()
  deviceType!: string;

  @Column()
  os!: string;

  @Column({
    type: 'enum',
    enum: AccountSessionStatus,
    default: AccountSessionStatus.ACTIVE
  })
  status!: AccountSessionStatus;
}
