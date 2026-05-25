import { DeleteLessonPort } from "@ports/in/lesson/delete-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteLessonUseCase implements DeleteLessonPort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async deleteLesson(lessonId: string): Promise<void> {
    return this.lessonPersistencePort.delete(lessonId);
  }
}
