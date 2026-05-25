import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { IdentifierType, OtpStatus } from "@common/auth/enum";
import { BaseEntity } from "../base/base.entity";

@Entity({ name: 'otp' })
export class Otp extends BaseEntity  {

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    public user!: User;


    @Column({ type: 'varchar', nullable: false })
    identifier!: string;

    @Column({
        name: 'identifier_type',
        type: 'enum',
        enum: IdentifierType,
    })
    public identifierType!: IdentifierType;

    @Column({
        name: 'status',
        type: 'enum',
        enum: OtpStatus,
        default: OtpStatus.ACTIVE,
    })
    public status!: OtpStatus; 

    @Column({ type: 'timestamp', nullable: false })
    expiresAt!: Date;

    @Column({ type: 'varchar', length: 10, nullable: false })
    code!: string;

    @Column({ type: 'int', default: 0 })
    attempts!: number;

  
}