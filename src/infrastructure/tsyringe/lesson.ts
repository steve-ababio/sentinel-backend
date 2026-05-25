import { container } from "tsyringe";

import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { LessonRepository } from "@infrastructure/typeorm/repository/lesson/lesson.repository";

import { CreateLessonPort } from "@ports/in/lesson/create-lesson.port";
import { CreateLessonUseCase } from "@domain/application/lesson/create-lesson.use-case";

import { DeleteLessonPort } from "@ports/in/lesson/delete-lesson.port";
import { DeleteLessonUseCase } from "@domain/application/lesson/delete-lesson.use-case";

import { FindLessonByIdPort } from "@ports/in/lesson/find-lesson-by-id.port";
import { FindLessonByIdUseCase } from "@domain/application/lesson/find-lesson-by-id.use-case";

import { FindLessonsByModulePort } from "@ports/in/lesson/find-lessons-by-module.port";
import { FindLessonsByModuleUseCase } from "@domain/application/lesson/find-lessons-by-module.use-case";

import { FindNextLessonPort } from "@ports/in/lesson/find-next-lesson.port";
import { FindNextLessonUseCase } from "@domain/application/lesson/find-next-lesson.use-case";

import { FindPreviousLessonPort } from "@ports/in/lesson/find-previous-lesson.port";
import { FindPreviousLessonUseCase } from "@domain/application/lesson/find-previous-lesson.use-case";

import { CountLessonsByCoursePort } from "@ports/in/lesson/count-lessons-by-course.port";
import { CountLessonsByCourseUseCase } from "@domain/application/lesson/count-lessons-by-course.use-case";

container.register<LessonPersistencePort>("LessonPersistencePort", {
    useClass: LessonRepository
});

container.register<CreateLessonPort>("CreateLessonPort", {
    useClass: CreateLessonUseCase
});

container.register<DeleteLessonPort>("DeleteLessonPort", {
    useClass: DeleteLessonUseCase
});

container.register<FindLessonByIdPort>("FindLessonByIdPort", {
    useClass: FindLessonByIdUseCase
});

container.register<FindLessonsByModulePort>("FindLessonsByModulePort", {
    useClass: FindLessonsByModuleUseCase
});

container.register<FindNextLessonPort>("FindNextLessonPort", {
    useClass: FindNextLessonUseCase
});

container.register<FindPreviousLessonPort>("FindPreviousLessonPort", {
    useClass: FindPreviousLessonUseCase
});

container.register<CountLessonsByCoursePort>("CountLessonsByCoursePort", {
    useClass: CountLessonsByCourseUseCase
});
