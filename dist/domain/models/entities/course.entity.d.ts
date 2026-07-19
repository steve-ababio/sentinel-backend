import { CourseLevel, PricingModel } from "@common/global/types";
import { ReviewEntity } from "./review.entity";
import { ProgressEntity } from "./progress.entity";
import { InstructorEntity } from "./instructor.entity";
export declare class CourseEntity {
    title: string;
    description: string;
    thumbnail: string;
    isPopular: boolean;
    skillsGained: string[];
    provider: string;
    expectedExperience: string[] | null;
    approvalRate: number;
    languages: string[];
    price: number;
    pricingModel: PricingModel;
    enrolledCount: number;
    specialization: string | null;
    progress: ProgressEntity[];
    difficulty: CourseLevel;
    reviews: ReviewEntity[];
    id?: string | undefined;
    instructor?: (InstructorEntity | null) | undefined;
    instructorId?: string | undefined;
    constructor(title: string, description: string, thumbnail: string, isPopular: boolean, skillsGained: string[], provider: string, expectedExperience: string[] | null, approvalRate: number, languages: string[], price: number, pricingModel: PricingModel, enrolledCount: number, specialization: string | null, progress: ProgressEntity[], difficulty: CourseLevel, reviews: ReviewEntity[], id?: string | undefined, instructor?: (InstructorEntity | null) | undefined, instructorId?: string | undefined);
}
