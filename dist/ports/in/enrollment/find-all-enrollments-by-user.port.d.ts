import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
export interface FindAllEnrollmentsByUserPort {
    findAllEnrollmentsByUser(userId: string): Promise<EnrollmentEntity[]>;
}
