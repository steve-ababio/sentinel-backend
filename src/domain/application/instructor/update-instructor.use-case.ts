import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { UpdateInstructorPort } from "@ports/in/instructor/update-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateInstructorUseCase implements UpdateInstructorPort {
  constructor(
    @inject('InstructorPersistencePort')
    private readonly instructorPersistencePort: InstructorPersistencePort
  ) {}

  async updateInstructor(instructor: InstructorEntity): Promise<BaseResponse> {
    return this.instructorPersistencePort.update(instructor);
  }
}
