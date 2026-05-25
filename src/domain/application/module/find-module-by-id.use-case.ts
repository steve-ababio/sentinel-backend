import { ModuleEntity } from "@domain/models/entities/module.entity";
import { FindModuleByIdPort } from "@ports/in/module/find-module-by-id.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindModuleByIdUseCase implements FindModuleByIdPort {
  constructor(
    @inject('ModulePersistencePort')
    private readonly modulePersistencePort: ModulePersistencePort
  ) {}

  async findModuleById(moduleId: string): Promise<ModuleEntity | null> {
    return this.modulePersistencePort.findById(moduleId);
  }
}
