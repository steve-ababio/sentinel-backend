"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const instructor_repository_1 = require("@infrastructure/typeorm/repository/instructor/instructor.repository");
const create_instructor_use_case_1 = require("@domain/application/instructor/create-instructor.use-case");
const update_instructor_use_case_1 = require("@domain/application/instructor/update-instructor.use-case");
const get_instructor_use_case_1 = require("@domain/application/instructor/get-instructor.use-case");
const delete_instructor_use_case_1 = require("@domain/application/instructor/delete-instructor.use-case");
const list_instructors_use_case_1 = require("@domain/application/instructor/list-instructors.use-case");
tsyringe_1.container.register("InstructorPersistencePort", {
    useClass: instructor_repository_1.InstructorRepository
});
tsyringe_1.container.register("CreateInstructorPort", {
    useClass: create_instructor_use_case_1.CreateInstructorUseCase
});
tsyringe_1.container.register("UpdateInstructorPort", {
    useClass: update_instructor_use_case_1.UpdateInstructorUseCase
});
tsyringe_1.container.register("GetInstructorPort", {
    useClass: get_instructor_use_case_1.GetInstructorUseCase
});
tsyringe_1.container.register("DeleteInstructorPort", {
    useClass: delete_instructor_use_case_1.DeleteInstructorUseCase
});
tsyringe_1.container.register("ListInstructorsPort", {
    useClass: list_instructors_use_case_1.ListInstructorsUseCase
});
