"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const module_repository_1 = require("@infrastructure/typeorm/repository/module/module.repository");
const save_module_use_case_1 = require("@domain/application/module/save-module.use-case");
const find_module_by_id_use_case_1 = require("@domain/application/module/find-module-by-id.use-case");
const find_modules_by_course_use_case_1 = require("@domain/application/module/find-modules-by-course.use-case");
const delete_module_use_case_1 = require("@domain/application/module/delete-module.use-case");
tsyringe_1.container.register("ModulePersistencePort", {
    useClass: module_repository_1.ModuleRepository
});
tsyringe_1.container.register("SaveModulePort", {
    useClass: save_module_use_case_1.SaveModuleUseCase
});
tsyringe_1.container.register("FindModuleByIdPort", {
    useClass: find_module_by_id_use_case_1.FindModuleByIdUseCase
});
tsyringe_1.container.register("FindModulesByCoursePort", {
    useClass: find_modules_by_course_use_case_1.FindModulesByCourseUseCase
});
tsyringe_1.container.register("DeleteModulePort", {
    useClass: delete_module_use_case_1.DeleteModuleUseCase
});
