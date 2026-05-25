import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { ListInstructorsPort } from "@ports/in/instructor/list-instructors.port";
import { InstructorParams, InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListInstructorsUseCase implements ListInstructorsPort {
  constructor(
    @inject('InstructorPersistencePort')
    private readonly instructorPersistencePort: InstructorPersistencePort
  ) {}

  async listInstructors(params?: InstructorParams): Promise<InstructorEntity[]> {
    return this.instructorPersistencePort.findAll(params);
  }
}
