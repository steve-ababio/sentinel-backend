import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { CreateInstructorPort } from "@ports/in/instructor/create-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateInstructorUseCase implements CreateInstructorPort {
  constructor(
    @inject('InstructorPersistencePort')
    private readonly instructorPersistencePort: InstructorPersistencePort
  ) {}

  async createInstructor(instructor: InstructorEntity): Promise<InstructorEntity> {
    return this.instructorPersistencePort.create(instructor);
  }
}
