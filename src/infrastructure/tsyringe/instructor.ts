import { container } from "tsyringe";

import { InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { InstructorRepository } from "@infrastructure/typeorm/repository/instructor/instructor.repository";

import { CreateInstructorPort } from "@ports/in/instructor/create-instructor.port";
import { CreateInstructorUseCase } from "@domain/application/instructor/create-instructor.use-case";

import { UpdateInstructorPort } from "@ports/in/instructor/update-instructor.port";
import { UpdateInstructorUseCase } from "@domain/application/instructor/update-instructor.use-case";

import { GetInstructorPort } from "@ports/in/instructor/get-instructor.port";
import { GetInstructorUseCase } from "@domain/application/instructor/get-instructor.use-case";

import { DeleteInstructorPort } from "@ports/in/instructor/delete-instructor.port";
import { DeleteInstructorUseCase } from "@domain/application/instructor/delete-instructor.use-case";

import { ListInstructorsPort } from "@ports/in/instructor/list-instructors.port";
import { ListInstructorsUseCase } from "@domain/application/instructor/list-instructors.use-case";

container.register<InstructorPersistencePort>("InstructorPersistencePort", {
    useClass: InstructorRepository
});

container.register<CreateInstructorPort>("CreateInstructorPort", {
    useClass: CreateInstructorUseCase
});

container.register<UpdateInstructorPort>("UpdateInstructorPort", {
    useClass: UpdateInstructorUseCase
});

container.register<GetInstructorPort>("GetInstructorPort", {
    useClass: GetInstructorUseCase
});

container.register<DeleteInstructorPort>("DeleteInstructorPort", {
    useClass: DeleteInstructorUseCase
});

container.register<ListInstructorsPort>("ListInstructorsPort", {
    useClass: ListInstructorsUseCase
});
