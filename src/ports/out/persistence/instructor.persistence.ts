import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";

export interface InstructorParams {
    search?: string;
    page?: number;
    resultsPerPage?: number;
}

export interface InstructorPersistencePort {
    create(instructor: InstructorEntity): Promise<InstructorEntity>;
    update(instructor: InstructorEntity): Promise<BaseResponse>;
    findById(id: string): Promise<InstructorEntity | null>;
    findAll(params?: InstructorParams): Promise<InstructorEntity[]>;
    delete(id: string): Promise<BaseResponse>;
}
