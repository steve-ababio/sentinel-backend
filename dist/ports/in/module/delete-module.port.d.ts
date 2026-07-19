import { BaseResponse } from "@common/global/types";
export interface DeleteModulePort {
    deleteModule(moduleId: string): Promise<BaseResponse>;
}
