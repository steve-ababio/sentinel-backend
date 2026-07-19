"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const lesson_repository_1 = require("@infrastructure/typeorm/repository/lesson/lesson.repository");
const create_lesson_use_case_1 = require("@domain/application/lesson/create-lesson.use-case");
const delete_lesson_use_case_1 = require("@domain/application/lesson/delete-lesson.use-case");
const find_lesson_by_id_use_case_1 = require("@domain/application/lesson/find-lesson-by-id.use-case");
const find_lessons_by_module_use_case_1 = require("@domain/application/lesson/find-lessons-by-module.use-case");
const find_next_lesson_use_case_1 = require("@domain/application/lesson/find-next-lesson.use-case");
const find_previous_lesson_use_case_1 = require("@domain/application/lesson/find-previous-lesson.use-case");
const count_lessons_by_course_use_case_1 = require("@domain/application/lesson/count-lessons-by-course.use-case");
tsyringe_1.container.register("LessonPersistencePort", {
    useClass: lesson_repository_1.LessonRepository
});
tsyringe_1.container.register("CreateLessonPort", {
    useClass: create_lesson_use_case_1.CreateLessonUseCase
});
tsyringe_1.container.register("DeleteLessonPort", {
    useClass: delete_lesson_use_case_1.DeleteLessonUseCase
});
tsyringe_1.container.register("FindLessonByIdPort", {
    useClass: find_lesson_by_id_use_case_1.FindLessonByIdUseCase
});
tsyringe_1.container.register("FindLessonsByModulePort", {
    useClass: find_lessons_by_module_use_case_1.FindLessonsByModuleUseCase
});
tsyringe_1.container.register("FindNextLessonPort", {
    useClass: find_next_lesson_use_case_1.FindNextLessonUseCase
});
tsyringe_1.container.register("FindPreviousLessonPort", {
    useClass: find_previous_lesson_use_case_1.FindPreviousLessonUseCase
});
tsyringe_1.container.register("CountLessonsByCoursePort", {
    useClass: count_lessons_by_course_use_case_1.CountLessonsByCourseUseCase
});
