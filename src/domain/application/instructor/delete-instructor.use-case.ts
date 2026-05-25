import { BaseResponse } from "@common/global/types";
import { DeleteInstructorPort } from "@ports/in/instructor/delete-instructor.port";
import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteInstructorUseCase implements DeleteInstructorPort {
  constructor(
    @inject('InstructorPersistencePort')
    private readonly instructorPersistencePort: InstructorPersistencePort
  ) {}

  async deleteInstructor(id: string): Promise<BaseResponse> {
    return this.instructorPersistencePort.delete(id);
  }
}
