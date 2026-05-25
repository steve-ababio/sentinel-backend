import { BaseResponse } from "@common/global/types";

export interface DeleteCoursePort {
    deleteCourse(courseId: string): Promise<BaseResponse>;
}
