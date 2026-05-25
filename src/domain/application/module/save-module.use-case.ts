import { ModuleEntity } from "@domain/models/entities/module.entity";
import { SaveModulePort } from "@ports/in/module/save-module.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class SaveModuleUseCase implements SaveModulePort {
  constructor(
    @inject('ModulePersistencePort')
    private readonly modulePersistencePort: ModulePersistencePort
  ) {}

  async saveModule(module: ModuleEntity): Promise<ModuleEntity> {
    return this.modulePersistencePort.save(module);
  }
}
