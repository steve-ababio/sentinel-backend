import { BaseResponse } from "@common/global/types";
import { DeleteInstructorPort } from "@ports/in/instructor/delete-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class DeleteInstructorUseCase implements DeleteInstructorPort {
    private readonly instructorPersistencePort;
    constructor(instructorPersistencePort: InstructorPersistencePort);
    deleteInstructor(id: string): Promise<BaseResponse>;
}
