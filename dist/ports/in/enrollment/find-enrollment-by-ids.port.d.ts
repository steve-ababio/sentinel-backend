import { BaseResponse } from "@common/global/types";
export interface FindEnrollmentByIdsPort {
    findEnrollmentByIds(userId: string, courseId: string): Promise<BaseResponse>;
}
