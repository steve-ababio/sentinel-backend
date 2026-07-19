import { EntityType } from "@common/global/types";
export declare class ReviewEntity {
    id: string;
    reviewerId: string;
    rating: number;
    entityType: EntityType;
    entityId: string;
    comment?: string | undefined;
    constructor(id: string, reviewerId: string, rating: number, entityType: EntityType, entityId: string, comment?: string | undefined);
}
