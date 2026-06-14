import { container } from "tsyringe";

import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { EnrollmentRepository } from "@infrastructure/typeorm/repository/enrollment/enrollment.repository";

import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { CreateEnrollmentUseCase } from "@domain/application/enrollment/create-enrollment.use-case";

import { FindEnrollmentByIdsPort } from "@ports/in/enrollment/find-enrollment-by-ids.port";
import { FindEnrollmentByIdsUseCase } from "@domain/application/enrollment/find-enrollment-by-ids.use-case";

import { FindAllEnrollmentsByUserPort } from "@ports/in/enrollment/find-all-enrollments-by-user.port";
import { FindAllEnrollmentsByUserUseCase } from "@domain/application/enrollment/find-all-enrollments-by-user.use-case";

import { CompleteEnrollmentPort } from "@ports/in/enrollment/complete-enrollment.port";
import { CompleteEnrollmentUseCase } from "@domain/application/enrollment/complete-enrollment.use-case";

container.register<EnrollmentPersistencePort>("EnrollmentPersistencePort", {
    useClass: EnrollmentRepository
});

container.register<CreateEnrollmentPort>("CreateEnrollmentPort", {
    useClass: CreateEnrollmentUseCase
});

container.register<FindEnrollmentByIdsPort>("FindEnrollmentByIdsPort", {
    useClass: FindEnrollmentByIdsUseCase
});

container.register<FindAllEnrollmentsByUserPort>("FindAllEnrollmentsByUserPort", {
    useClass: FindAllEnrollmentsByUserUseCase
});

container.register<CompleteEnrollmentPort>("CompleteEnrollmentPort", {
    useClass: CompleteEnrollmentUseCase
});

