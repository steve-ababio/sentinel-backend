import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindNextLessonPort } from "@ports/in/lesson/find-next-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindNextLessonUseCase implements FindNextLessonPort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async findNextLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null> {
    return this.lessonPersistencePort.findNextLesson(courseId, currentLessonOrder);
  }
}
