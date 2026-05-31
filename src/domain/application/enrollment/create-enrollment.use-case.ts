import { BaseResponse } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { IdentifierType } from "@common/auth/enum";
import { ContactStatus } from "@common/user/enum";
import { RouteError } from "@infrastructure/web/util/route-error";
import { STATUS_CODES } from "@common/web/status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateEnrollmentUseCase implements CreateEnrollmentPort {
  constructor(
    @inject('EnrollmentPersistencePort')
    private readonly enrollmentPersistencePort: EnrollmentPersistencePort,
    @inject('ContactPersistencePort')
    private readonly contactPersistencePort: ContactPersistencePort,
  ) {}

  async createEnrollment(enrollment: EnrollmentEntity): Promise<BaseResponse> {
    const contacts = await this.contactPersistencePort.findAllUserContacts(enrollment.userId);
    const emailContact = contacts?.find(c => c.identifierType === IdentifierType.EMAIL);

    if (!emailContact || emailContact.status !== ContactStatus.VERIFIED) {
        throw new RouteError(STATUS_CODES.BAD_REQUEST, "Email verification required before enrollment.");
    }

    return this.enrollmentPersistencePort.create(enrollment);
  }
}

