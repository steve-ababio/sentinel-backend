import { BaseResponse } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";

export interface CreateEnrollmentPort {
    createEnrollment(enrollment: EnrollmentEntity): Promise<BaseResponse>;
}
