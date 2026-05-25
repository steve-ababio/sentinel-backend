import { IdentifierType, ContactStatus } from "@common/user/enum";
import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "../user/user.entity";
import { BaseEntity } from '../base/base.entity';

@Entity() 
export class Contact extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column({ name: 'identifier', type: 'varchar', unique: true })
  public identifier!: string; 

  @Column({
    name: 'identifier_type',
    type: 'enum',
    enum: IdentifierType,
  })
  public identifierType!: IdentifierType; 

  @Column({
    name: 'status',
    type: 'enum',
    enum: ContactStatus,
    default: ContactStatus.NOT_STARTED,
  })
  public status!: ContactStatus; 
}