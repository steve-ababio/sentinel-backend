import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { FindAllEnrollmentsByUserPort } from "@ports/in/enrollment/find-all-enrollments-by-user.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllEnrollmentsByUserUseCase implements FindAllEnrollmentsByUserPort {
    constructor(
        @inject("EnrollmentPersistencePort")
        private readonly enrollmentPersistencePort: EnrollmentPersistencePort
    ) {}

    async findAllEnrollmentsByUser(userId: string): Promise<EnrollmentEntity[]> {
        return this.enrollmentPersistencePort.findAllByUserId(userId);
    }
}
