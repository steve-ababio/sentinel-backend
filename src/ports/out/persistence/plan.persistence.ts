import { PlanEntity } from "@domain/models/entities/plan.entity";

export interface PlanRepository {
    findAll(): Promise<PlanEntity[]>;
    findById(planId: string): Promise<PlanEntity | null>;
}