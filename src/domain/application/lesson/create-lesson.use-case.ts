import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { CreateLessonPort } from "@ports/in/lesson/create-lesson.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateLessonUseCase implements CreateLessonPort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async createLesson(lesson: LessonEntity): Promise<LessonEntity> {
    return this.lessonPersistencePort.create(lesson);
  }
}
