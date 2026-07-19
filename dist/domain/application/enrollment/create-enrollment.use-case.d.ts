import { BaseResponse } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
export declare class CreateEnrollmentUseCase implements CreateEnrollmentPort {
    private readonly enrollmentPersistencePort;
    private readonly contactPersistencePort;
    constructor(enrollmentPersistencePort: EnrollmentPersistencePort, contactPersistencePort: ContactPersistencePort);
    createEnrollment(enrollment: EnrollmentEntity): Promise<BaseResponse>;
}
