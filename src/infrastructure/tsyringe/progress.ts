import { container } from "tsyringe";

import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { ProgressRepository } from "@infrastructure/typeorm/repository/progress/progress.repository";

import { UpdateProgressPort } from "@ports/in/progress/update-progress.port";
import { UpdateProgressUseCase } from "@domain/application/progress/update-progress.use-case";

import { SaveProgressPort } from "@ports/in/progress/save-progress.port";
import { SaveProgressUseCase } from "@domain/application/progress/save-progress.use-case";

import { FindProgressByLessonPort } from "@ports/in/progress/find-progress-by-lesson.port";
import { FindProgressByLessonUseCase } from "@domain/application/progress/find-progress-by-lesson.use-case";

import { FindCourseProgressPort } from "@ports/in/progress/find-course-progress.port";
import { FindCourseProgressUseCase } from "@domain/application/progress/find-course-progress.use-case";

import { GetLastWatchedLessonPort } from "@ports/in/progress/get-last-watched-lesson.port";
import { GetLastWatchedLessonUseCase } from "@domain/application/progress/get-last-watched-lesson.use-case";

container.register<ProgressPersistencePort>("ProgressPersistencePort", {
    useClass: ProgressRepository
});

container.register<UpdateProgressPort>("UpdateProgressPort", {
    useClass: UpdateProgressUseCase
});

container.register<SaveProgressPort>("SaveProgressPort", {
    useClass: SaveProgressUseCase
});

container.register<FindProgressByLessonPort>("FindProgressByLessonPort", {
    useClass: FindProgressByLessonUseCase
});

container.register<FindCourseProgressPort>("FindCourseProgressPort", {
    useClass: FindCourseProgressUseCase
});

container.register<GetLastWatchedLessonPort>("GetLastWatchedLessonPort", {
    useClass: GetLastWatchedLessonUseCase
});
