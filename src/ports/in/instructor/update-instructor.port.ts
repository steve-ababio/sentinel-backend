import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";

export interface UpdateInstructorPort {
    updateInstructor(instructor: InstructorEntity): Promise<BaseResponse>;
}
