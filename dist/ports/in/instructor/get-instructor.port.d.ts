import { InstructorEntity } from "@domain/models/entities/instructor.entity";
export interface GetInstructorPort {
    getInstructor(id: string): Promise<InstructorEntity | null>;
}
