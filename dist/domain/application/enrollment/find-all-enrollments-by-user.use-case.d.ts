import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { FindAllEnrollmentsByUserPort } from "@ports/in/enrollment/find-all-enrollments-by-user.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
export declare class FindAllEnrollmentsByUserUseCase implements FindAllEnrollmentsByUserPort {
    private readonly enrollmentPersistencePort;
    constructor(enrollmentPersistencePort: EnrollmentPersistencePort);
    findAllEnrollmentsByUser(userId: string): Promise<EnrollmentEntity[]>;
}
