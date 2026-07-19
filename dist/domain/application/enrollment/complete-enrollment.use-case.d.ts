import { BaseResponse } from "@common/global/types";
import { CompleteEnrollmentPort } from "@ports/in/enrollment/complete-enrollment.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
export declare class CompleteEnrollmentUseCase implements CompleteEnrollmentPort {
    private readonly enrollmentPersistencePort;
    constructor(enrollmentPersistencePort: EnrollmentPersistencePort);
    completeEnrollment(userId: string, courseId: string): Promise<BaseResponse>;
}
