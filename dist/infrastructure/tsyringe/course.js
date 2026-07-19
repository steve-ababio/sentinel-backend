"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const course_repository_1 = require("@infrastructure/typeorm/repository/course/course.repository");
const create_course_use_case_1 = require("@domain/application/course/create-course.use-case");
const update_course_use_case_1 = require("@domain/application/course/update-course.use-case");
const find_course_by_id_use_case_1 = require("@domain/application/course/find-course-by-id.use-case");
const find_all_courses_use_case_1 = require("@domain/application/course/find-all-courses.use-case");
const delete_course_use_case_1 = require("@domain/application/course/delete-course.use-case");
const get_league_table_use_case_1 = require("@domain/application/course/get-league-table.use-case");
tsyringe_1.container.register("CoursePersistencePort", {
    useClass: course_repository_1.CourseRepository
});
tsyringe_1.container.register("CreateCoursePort", {
    useClass: create_course_use_case_1.CreateCourseUseCase
});
tsyringe_1.container.register("UpdateCoursePort", {
    useClass: update_course_use_case_1.UpdateCourseUseCase
});
tsyringe_1.container.register("FindCourseByIdPort", {
    useClass: find_course_by_id_use_case_1.FindCourseByIdUseCase
});
tsyringe_1.container.register("FindAllCoursesPort", {
    useClass: find_all_courses_use_case_1.FindAllCoursesUseCase
});
tsyringe_1.container.register("DeleteCoursePort", {
    useClass: delete_course_use_case_1.DeleteCourseUseCase
});
tsyringe_1.container.register("GetLeagueTablePort", {
    useClass: get_league_table_use_case_1.GetLeagueTableUseCase
});
