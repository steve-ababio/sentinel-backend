import { BaseResponse } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateEnrollmentUseCase implements CreateEnrollmentPort {
  constructor(
    @inject('EnrollmentPersistencePort')
    private readonly enrollmentPersistencePort: EnrollmentPersistencePort
  ) {}

  async createEnrollment(enrollment: EnrollmentEntity): Promise<BaseResponse> {
    return this.enrollmentPersistencePort.create(enrollment);
  }
}
