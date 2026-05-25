import { ModuleEntity } from "@domain/models/entities/module.entity";
import { FindModulesByCoursePort } from "@ports/in/module/find-modules-by-course.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindModulesByCourseUseCase implements FindModulesByCoursePort {
  constructor(
    @inject('ModulePersistencePort')
    private readonly modulePersistencePort: ModulePersistencePort
  ) {}

  async findModulesByCourse(courseId: string): Promise<ModuleEntity[]> {
    return this.modulePersistencePort.findByCourse(courseId);
  }
}
