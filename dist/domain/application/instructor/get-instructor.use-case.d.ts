import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { GetInstructorPort } from "@ports/in/instructor/get-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class GetInstructorUseCase implements GetInstructorPort {
    private readonly instructorPersistencePort;
    constructor(instructorPersistencePort: InstructorPersistencePort);
    getInstructor(id: string): Promise<InstructorEntity | null>;
}
