import { container } from "tsyringe";

import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
import { CourseRepository } from "@infrastructure/typeorm/repository/course/course.repository";

import { CreateCoursePort } from "@ports/in/course/create-course.port";
import { CreateCourseUseCase } from "@domain/application/course/create-course.use-case";

import { UpdateCoursePort } from "@ports/in/course/update-course.port";
import { UpdateCourseUseCase } from "@domain/application/course/update-course.use-case";

import { FindCourseByIdPort } from "@ports/in/course/find-course-by-id.port";
import { FindCourseByIdUseCase } from "@domain/application/course/find-course-by-id.use-case";

import { FindAllCoursesPort } from "@ports/in/course/find-all-courses.port";
import { FindAllCoursesUseCase } from "@domain/application/course/find-all-courses.use-case";

import { DeleteCoursePort } from "@ports/in/course/delete-course.port";
import { DeleteCourseUseCase } from "@domain/application/course/delete-course.use-case";

import { GetLeagueTablePort } from "@ports/in/course/get-league-table.port";
import { GetLeagueTableUseCase } from "@domain/application/course/get-league-table.use-case";

container.register<CoursePersistencePort>("CoursePersistencePort", {
    useClass: CourseRepository
});

container.register<CreateCoursePort>("CreateCoursePort", {
    useClass: CreateCourseUseCase
});

container.register<UpdateCoursePort>("UpdateCoursePort", {
    useClass: UpdateCourseUseCase
});

container.register<FindCourseByIdPort>("FindCourseByIdPort", {
    useClass: FindCourseByIdUseCase
});

container.register<FindAllCoursesPort>("FindAllCoursesPort", {
    useClass: FindAllCoursesUseCase
});

container.register<DeleteCoursePort>("DeleteCoursePort", {
    useClass: DeleteCourseUseCase
});

container.register<GetLeagueTablePort>("GetLeagueTablePort", {
    useClass: GetLeagueTableUseCase
});
