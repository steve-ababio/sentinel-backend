import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Enrollment } from "../enrollment/enrollment.entity";
import { CourseLevel, PricingModel } from "@common/global/types";
import { Progress } from "../progress/progress.entity";
import { Instructor } from "../instructor/instructor.entity";
export declare class Course extends BaseEntity {
    title: string;
    description: string;
    skillsGained: string[];
    expectedExperience?: string[];
    thumbnail: string;
    isPopular: boolean;
    provider: string;
    pricingModel: PricingModel;
    price: number;
    specialization: string;
    enrolledCount: number;
    difficulty: CourseLevel;
    approvalRate: number;
    languages: string[];
    modules: Module[];
    enrollments: Enrollment[];
    progress: Progress[];
    instructor?: Instructor;
}
