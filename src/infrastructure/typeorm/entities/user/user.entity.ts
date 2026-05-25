import { Entity, Column, Unique, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { AccountAuthStatus, SocialChannel } from '@common/auth/enum';


@Entity({ name: 'user' })
@Unique(['identifier']) 
export class User extends BaseEntity {

  @Index()
  @Column({ name: 'identifier', type: 'varchar', unique: true })
  public identifier!: string; 

  @Column({
    name: 'social_channel',
    type: 'enum',
    enum: SocialChannel,
    default: SocialChannel.NONE,
  })
  public socialChannel!: SocialChannel; 

  @Column({
    name: 'account_auth_status',
    type: 'enum',
    enum: AccountAuthStatus,
    nullable: true
  })
  public accountAuthStatus!: AccountAuthStatus; 

  @Column({ name: 'social_channel_id', type: 'varchar', nullable: true })
  public socialChannelId!: string | null; 

  @Column({ name: 'password', type: 'varchar', nullable: true })
  public password!: string | null; 

  @Column({
    name: 'password_reset_date',
    type: 'timestamp',
    nullable: true, 
  })
  public passwordResetDate?: Date; 
  
}