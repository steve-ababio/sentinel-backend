import { container } from "tsyringe";

import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { ModuleRepository } from "@infrastructure/typeorm/repository/module/module.repository";

import { SaveModulePort } from "@ports/in/module/save-module.port";
import { SaveModuleUseCase } from "@domain/application/module/save-module.use-case";

import { FindModuleByIdPort } from "@ports/in/module/find-module-by-id.port";
import { FindModuleByIdUseCase } from "@domain/application/module/find-module-by-id.use-case";

import { FindModulesByCoursePort } from "@ports/in/module/find-modules-by-course.port";
import { FindModulesByCourseUseCase } from "@domain/application/module/find-modules-by-course.use-case";

import { DeleteModulePort } from "@ports/in/module/delete-module.port";
import { DeleteModuleUseCase } from "@domain/application/module/delete-module.use-case";

container.register<ModulePersistencePort>("ModulePersistencePort", {
    useClass: ModuleRepository
});

container.register<SaveModulePort>("SaveModulePort", {
    useClass: SaveModuleUseCase
});

container.register<FindModuleByIdPort>("FindModuleByIdPort", {
    useClass: FindModuleByIdUseCase
});

container.register<FindModulesByCoursePort>("FindModulesByCoursePort", {
    useClass: FindModulesByCourseUseCase
});

container.register<DeleteModulePort>("DeleteModulePort", {
    useClass: DeleteModuleUseCase
});
