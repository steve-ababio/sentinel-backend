import { CourseLevel, PricingModel } from "@common/global/types";
import { ReviewEntity } from "./review.entity";
import { ProgressEntity } from "./progress.entity";
import { InstructorEntity } from "./instructor.entity";

export class CourseEntity {
    constructor(
       
        public title:string,
        public description:string,
        public thumbnail:string,
        public isPopular:boolean,

        public skillsGained: string[],
        public provider:string,
        public expectedExperience: string[] | null,
        public approvalRate: number,
        public languages:string[],
        public price: number,
        public pricingModel:PricingModel,
        public enrolledCount: number,
  
        public specialization: string | null,
  
        public progress: ProgressEntity[],
        public difficulty: CourseLevel,
        public reviews:ReviewEntity[],
        public id?:string,
        public instructor?: InstructorEntity | null,
        public instructorId?: string,
    ) {}

}