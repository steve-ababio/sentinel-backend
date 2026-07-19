import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { FindCourseProgressPort } from "@ports/in/progress/find-course-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
export declare class FindCourseProgressUseCase implements FindCourseProgressPort {
    private readonly progressPersistencePort;
    constructor(progressPersistencePort: ProgressPersistencePort);
    findCourseProgress(userId: string, courseId: string): Promise<ProgressEntity[]>;
}
