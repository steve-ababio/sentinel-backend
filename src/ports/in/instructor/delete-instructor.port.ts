import { BaseResponse } from "@common/global/types";

export interface DeleteInstructorPort {
    deleteInstructor(id: string): Promise<BaseResponse>;
}
