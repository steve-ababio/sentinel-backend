import { inject, injectable } from "tsyringe";
import { BaseResponse, EnrollmentStatus } from "@common/global/types";
import { CompleteEnrollmentPort } from "@ports/in/enrollment/complete-enrollment.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";

@injectable()
export class CompleteEnrollmentUseCase implements CompleteEnrollmentPort {
    constructor(
        @inject("EnrollmentPersistencePort")
        private readonly enrollmentPersistencePort: EnrollmentPersistencePort
    ) {}

    async completeEnrollment(userId: string, courseId: string): Promise<BaseResponse> {
        return this.enrollmentPersistencePort.updateStatus(userId, courseId, EnrollmentStatus.COMPLETED);
    }
}
