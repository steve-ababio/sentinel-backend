import { ProgressEntity } from "@domain/models/entities/progress.entity";

export interface UpdateProgressPort {
    updateProgress(progress: ProgressEntity, lessonId: string): Promise<void>;
}
