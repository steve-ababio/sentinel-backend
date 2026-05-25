import { BaseResponse } from "@common/global/types";
import { DeleteModulePort } from "@ports/in/module/delete-module.port";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteModuleUseCase implements DeleteModulePort {
  constructor(
    @inject('ModulePersistencePort')
    private readonly modulePersistencePort: ModulePersistencePort
  ) {}

  async deleteModule(moduleId: string): Promise<BaseResponse> {
    return this.modulePersistencePort.delete(moduleId);
  }
}
