import { EntityType } from "@common/global/types";

export class ReviewEntity {
    constructor(
         public id: string,
        public reviewerId: string,
        public rating: number,
        public entityType: EntityType,
        public entityId: string,
        public comment?:string,
    ) {}
}