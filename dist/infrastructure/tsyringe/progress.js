"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const progress_repository_1 = require("@infrastructure/typeorm/repository/progress/progress.repository");
const update_progress_use_case_1 = require("@domain/application/progress/update-progress.use-case");
const save_progress_use_case_1 = require("@domain/application/progress/save-progress.use-case");
const find_progress_by_lesson_use_case_1 = require("@domain/application/progress/find-progress-by-lesson.use-case");
const find_course_progress_use_case_1 = require("@domain/application/progress/find-course-progress.use-case");
const get_last_watched_lesson_use_case_1 = require("@domain/application/progress/get-last-watched-lesson.use-case");
tsyringe_1.container.register("ProgressPersistencePort", {
    useClass: progress_repository_1.ProgressRepository
});
tsyringe_1.container.register("UpdateProgressPort", {
    useClass: update_progress_use_case_1.UpdateProgressUseCase
});
tsyringe_1.container.register("SaveProgressPort", {
    useClass: save_progress_use_case_1.SaveProgressUseCase
});
tsyringe_1.container.register("FindProgressByLessonPort", {
    useClass: find_progress_by_lesson_use_case_1.FindProgressByLessonUseCase
});
tsyringe_1.container.register("FindCourseProgressPort", {
    useClass: find_course_progress_use_case_1.FindCourseProgressUseCase
});
tsyringe_1.container.register("GetLastWatchedLessonPort", {
    useClass: get_last_watched_lesson_use_case_1.GetLastWatchedLessonUseCase
});
