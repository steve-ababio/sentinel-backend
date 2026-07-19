import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { CreateInstructorPort } from "@ports/in/instructor/create-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class CreateInstructorUseCase implements CreateInstructorPort {
    private readonly instructorPersistencePort;
    constructor(instructorPersistencePort: InstructorPersistencePort);
    createInstructor(instructor: InstructorEntity): Promise<InstructorEntity>;
}
