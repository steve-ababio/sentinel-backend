import { InstructorEntity } from "@domain/models/entities/instructor.entity";

export interface CreateInstructorPort {
    createInstructor(instructor: InstructorEntity): Promise<InstructorEntity>;
}
