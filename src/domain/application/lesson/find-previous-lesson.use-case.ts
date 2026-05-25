import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindPreviousLessonPort } from "@ports/in/lesson/find-previous-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPreviousLessonUseCase implements FindPreviousLessonPort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async findPreviousLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null> {
    return this.lessonPersistencePort.findPreviousLesson(courseId, currentLessonOrder);
  }
}
