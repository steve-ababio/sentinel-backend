import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { InstructorParams, InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
export declare class InstructorRepository implements InstructorPersistencePort {
    private toPersistence;
    private toDomain;
    create(instructorEntity: InstructorEntity): Promise<InstructorEntity>;
    update(instructorEntity: InstructorEntity): Promise<BaseResponse>;
    findById(id: string): Promise<InstructorEntity | null>;
    findAll(params?: InstructorParams): Promise<InstructorEntity[]>;
    delete(id: string): Promise<BaseResponse>;
}
