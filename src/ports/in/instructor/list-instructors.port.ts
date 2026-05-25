import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { InstructorParams } from "@ports/out/persistence/instructor.persistence";

export interface ListInstructorsPort {
    listInstructors(params?: InstructorParams): Promise<InstructorEntity[]>;
}
