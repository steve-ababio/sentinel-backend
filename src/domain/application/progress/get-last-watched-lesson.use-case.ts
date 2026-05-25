import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { GetLastWatchedLessonPort } from "@ports/in/progress/get-last-watched-lesson.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetLastWatchedLessonUseCase implements GetLastWatchedLessonPort {
  constructor(
    @inject('ProgressPersistencePort')
    private readonly progressPersistencePort: ProgressPersistencePort
  ) {}

  async getLastWatchedLesson(userId: string, courseId: string): Promise<LessonEntity | null> {
    return this.progressPersistencePort.getLastWatchedLesson(userId, courseId);
  }
}
