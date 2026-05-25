import { BaseResponse } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { FindEnrollmentByIdsPort } from "@ports/in/enrollment/find-enrollment-by-ids.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindEnrollmentByIdsUseCase implements FindEnrollmentByIdsPort {
  constructor(
    @inject('EnrollmentPersistencePort')
    private readonly enrollmentPersistencePort: EnrollmentPersistencePort
  ) {}

  async findEnrollmentByIds(userId: string, courseId: string): Promise<BaseResponse> {
    return this.enrollmentPersistencePort.findByIds(userId,courseId);
  }
}
