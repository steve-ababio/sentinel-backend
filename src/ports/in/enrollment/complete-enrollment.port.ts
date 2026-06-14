import { BaseResponse } from "@common/global/types";

export interface CompleteEnrollmentPort {
    completeEnrollment(userId: string, courseId: string): Promise<BaseResponse>;
}
