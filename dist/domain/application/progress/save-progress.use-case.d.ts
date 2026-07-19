import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { SaveProgressPort } from "@ports/in/progress/save-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
export declare class SaveProgressUseCase implements SaveProgressPort {
    private readonly progressPersistencePort;
    constructor(progressPersistencePort: ProgressPersistencePort);
    saveProgress(progress: ProgressEntity, lessonId: string): Promise<void>;
}
