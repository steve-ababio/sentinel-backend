import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindLessonByIdPort } from "@ports/in/lesson/find-lesson-by-id.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLessonByIdUseCase implements FindLessonByIdPort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async findLessonById(lessonId: string): Promise<LessonEntity | null> {
    return this.lessonPersistencePort.findById(lessonId);
  }
}
