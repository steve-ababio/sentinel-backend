import { BaseResponse } from "@common/global/types";
import { FindEnrollmentByIdsPort } from "@ports/in/enrollment/find-enrollment-by-ids.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
export declare class FindEnrollmentByIdsUseCase implements FindEnrollmentByIdsPort {
    private readonly enrollmentPersistencePort;
    constructor(enrollmentPersistencePort: EnrollmentPersistencePort);
    findEnrollmentByIds(userId: string, courseId: string): Promise<BaseResponse>;
}
