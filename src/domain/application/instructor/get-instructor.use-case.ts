import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { GetInstructorPort } from "@ports/in/instructor/get-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetInstructorUseCase implements GetInstructorPort {
  constructor(
    @inject('InstructorPersistencePort')
    private readonly instructorPersistencePort: InstructorPersistencePort
  ) {}

  async getInstructor(id: string): Promise<InstructorEntity | null> {
    return this.instructorPersistencePort.findById(id);
  }
}
