import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { FindLessonsByModulePort } from "@ports/in/lesson/find-lessons-by-module.port";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindLessonsByModuleUseCase implements FindLessonsByModulePort {
  constructor(
    @inject('LessonPersistencePort')
    private readonly lessonPersistencePort: LessonPersistencePort
  ) {}

  async findLessonsByModule(moduleId: string): Promise<LessonEntity[]> {
    return this.lessonPersistencePort.findByModule(moduleId);
  }
}
