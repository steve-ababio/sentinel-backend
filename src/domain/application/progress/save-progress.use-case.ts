import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { SaveProgressPort } from "@ports/in/progress/save-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class SaveProgressUseCase implements SaveProgressPort {
  constructor(
    @inject('ProgressPersistencePort')
    private readonly progressPersistencePort: ProgressPersistencePort
  ) {}

  async saveProgress(progress: ProgressEntity, lessonId: string): Promise<void> {
    return this.progressPersistencePort.save(progress, lessonId);
  }
}
