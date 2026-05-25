import { ProgressEntity } from "@domain/models/entities/progress.entity";

export interface FindCourseProgressPort {
    findCourseProgress(userId: string, courseId: string): Promise<ProgressEntity[]>;
}
