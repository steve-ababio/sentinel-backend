import { ProgressEntity } from "@domain/models/entities/progress.entity";

export interface SaveProgressPort {
    saveProgress(progress: ProgressEntity, lessonId: string): Promise<void>;
}
