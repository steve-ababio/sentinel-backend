import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity('instructor')
export class Instructor extends BaseEntity{
    @Index()
    @Column({ name: 'email', type: 'varchar', unique: true })
    public email!: string; 

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    public firstName!: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    public lastName!: string;
    
    @Column({ name: 'profile_picture', type: 'text', nullable: true })
    public profilePicture?: string; 

    @Column({ name: 'role', type: 'varchar', length: 200 })
    public role?: string; 

    @Column({ name: 'specialization', type: 'varchar', length: 200 })
    public specialization?: string; 

    @Column({ name: 'phone_number', type: 'varchar', length: 200 })
    public phoneNumber?: string; 

    @Column({ name: 'bio', type: 'text', nullable: true })
    public bio?: string; 
}