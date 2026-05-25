import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { User } from "../user/user.entity";
import { EntityType } from "@common/global/types";
import { UserInfo } from "../user-info/user-info.entity";

@Entity('review')
export class Review extends BaseEntity{
  
    @Index() 
    @ManyToOne(() => UserInfo, {nullable: false})
    @JoinColumn({name: "reviewer_id"})
    public reviewer!: UserInfo;

    @Column({
      name: "entity_type",
      type: "enum",
      enum: EntityType,
    })
    public entityType!: EntityType;

    @Column({
        name: "entity_id",
        type: "varchar",
        length: 255
    })
    public entityId!: string;
    @Column()
    rating!: number;

    @Column('text')
    comment!: string;
}