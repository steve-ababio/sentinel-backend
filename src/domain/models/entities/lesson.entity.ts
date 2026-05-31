
import { ResourceEntity } from "./resource.entity";

export class LessonEntity {
    constructor(
      public title: string,
      public videoUrl: string,
      public notes: string | null,
      public order: number,
      public description: string,
      public duration: number,
      public id?: string,
      public moduleId?: string,
      public resources?: ResourceEntity[],
    ) {}
  }