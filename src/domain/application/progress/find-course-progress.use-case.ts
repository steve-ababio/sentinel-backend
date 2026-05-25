import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { FindCourseProgressPort } from "@ports/in/progress/find-course-progress.port";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindCourseProgressUseCase implements FindCourseProgressPort {
  constructor(
    @inject('ProgressPersistencePort')
    private readonly progressPersistencePort: ProgressPersistencePort
  ) {}

  async findCourseProgress(userId: string, courseId: string): Promise<ProgressEntity[]> {
    return this.progressPersistencePort.findCourseProgress(userId, courseId);
  }
}
