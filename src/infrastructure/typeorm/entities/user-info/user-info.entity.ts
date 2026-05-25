import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'user_info' })
export class UserInfo extends BaseEntity {

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    public user!: User;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    public firstName!: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    public lastName!: string;

    @Column({
        name: 'company',
        type: 'varchar',
    })
    public company!: string; 
    
    @Column({
        name: 'phone_number',
        type: 'varchar',
    })
    public phoneNumber!: string; 

    @Column({ name: 'profile_picture', type: 'varchar', length: 255, nullable: true })
    public profilePicture!: string | null;

}