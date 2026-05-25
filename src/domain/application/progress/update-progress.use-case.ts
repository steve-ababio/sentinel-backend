import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { UpdateProgressPort } from "@ports/in/progress/update-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateProgressUseCase implements UpdateProgressPort {
  constructor(
    @inject('ProgressPersistencePort')
    private readonly progressPersistencePort: ProgressPersistencePort
  ) {}

  async updateProgress(progress: ProgressEntity, lessonId: string): Promise<void> {
    return this.progressPersistencePort.update(progress, lessonId);
  }
}
