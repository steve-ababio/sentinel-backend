import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { FindProgressByLessonPort } from "@ports/in/progress/find-progress-by-lesson.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindProgressByLessonUseCase implements FindProgressByLessonPort {
  constructor(
    @inject('ProgressPersistencePort')
    private readonly progressPersistencePort: ProgressPersistencePort
  ) {}

  async findProgressByLesson(userId: string, lessonId: string): Promise<ProgressEntity | null> {
    return this.progressPersistencePort.findByLesson(userId, lessonId);
  }
}
