import { CountLessonsByCoursePort } from "@ports/in/lesson/count-lessons-by-course.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CountLessonsByCourseUseCase implements CountLessonsByCoursePort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async countLessonsByCourse(courseId: string): Promise<number> {
    return this.lessonPersistencePort.countByCourse(courseId);
  }
}
