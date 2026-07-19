import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { ListInstructorsPort } from "@ports/in/instructor/list-instructors.port";
import { InstructorParams, InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class ListInstructorsUseCase implements ListInstructorsPort {
    private readonly instructorPersistencePort;
    constructor(instructorPersistencePort: InstructorPersistencePort);
    listInstructors(params?: InstructorParams): Promise<InstructorEntity[]>;
}
