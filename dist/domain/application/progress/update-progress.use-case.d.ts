import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { UpdateProgressPort } from "@ports/in/progress/update-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
export declare class UpdateProgressUseCase implements UpdateProgressPort {
    private readonly progressPersistencePort;
    constructor(progressPersistencePort: ProgressPersistencePort);
    updateProgress(progress: ProgressEntity, lessonId: string): Promise<void>;
}
