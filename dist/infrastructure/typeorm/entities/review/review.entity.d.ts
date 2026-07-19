import { BaseEntity } from "../base/base.entity";
import { EntityType } from "@common/global/types";
import { UserInfo } from "../user-info/user-info.entity";
export declare class Review extends BaseEntity {
    reviewer: UserInfo;
    entityType: EntityType;
    entityId: string;
    rating: number;
    comment: string;
}
