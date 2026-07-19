import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { UpdateInstructorPort } from "@ports/in/instructor/update-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class UpdateInstructorUseCase implements UpdateInstructorPort {
    private readonly instructorPersistencePort;
    constructor(instructorPersistencePort: InstructorPersistencePort);
    updateInstructor(instructor: InstructorEntity): Promise<BaseResponse>;
}
