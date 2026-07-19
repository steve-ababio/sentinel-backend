"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const enrollment_repository_1 = require("@infrastructure/typeorm/repository/enrollment/enrollment.repository");
const create_enrollment_use_case_1 = require("@domain/application/enrollment/create-enrollment.use-case");
const find_enrollment_by_ids_use_case_1 = require("@domain/application/enrollment/find-enrollment-by-ids.use-case");
const find_all_enrollments_by_user_use_case_1 = require("@domain/application/enrollment/find-all-enrollments-by-user.use-case");
const complete_enrollment_use_case_1 = require("@domain/application/enrollment/complete-enrollment.use-case");
tsyringe_1.container.register("EnrollmentPersistencePort", {
    useClass: enrollment_repository_1.EnrollmentRepository
});
tsyringe_1.container.register("CreateEnrollmentPort", {
    useClass: create_enrollment_use_case_1.CreateEnrollmentUseCase
});
tsyringe_1.container.register("FindEnrollmentByIdsPort", {
    useClass: find_enrollment_by_ids_use_case_1.FindEnrollmentByIdsUseCase
});
tsyringe_1.container.register("FindAllEnrollmentsByUserPort", {
    useClass: find_all_enrollments_by_user_use_case_1.FindAllEnrollmentsByUserUseCase
});
tsyringe_1.container.register("CompleteEnrollmentPort", {
    useClass: complete_enrollment_use_case_1.CompleteEnrollmentUseCase
});
