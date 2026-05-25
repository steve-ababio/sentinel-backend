import { BaseResponse } from "@common/global/types";
import { InstructorEntity } from "@domain/models/entities/instructor.entity";
import { InstructorParams, InstructorPersistencePort } from "@ports/out/persistence/instructor.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Instructor } from "@infrastructure/typeorm/entities/instructor/instructor.entity";
import { injectable } from "tsyringe";

@injectable()
export class InstructorRepository implements InstructorPersistencePort {

    private toPersistence(domain: InstructorEntity): Instructor {
        const model = new Instructor();
        if (domain.id) model.id = domain.id;
        model.email = domain.email;
        model.firstName = domain.firstName;
        model.lastName = domain.lastName;
        model.profilePicture = domain.profilePicture;
        model.role = domain.role;
        model.specialization = domain.specialization;
        model.phoneNumber = domain.phoneNumber;
        model.bio = domain.bio;

        return model;
    }

    private toDomain(model: Instructor): InstructorEntity {
        return new InstructorEntity(
            model.email,
            model.firstName,
            model.lastName,
            model.profilePicture,
            model.role,
            model.specialization,
            model.phoneNumber,
            model.bio,
            model.id
        );
    }

    async create(instructorEntity: InstructorEntity): Promise<InstructorEntity> {
        const saved = await manager.save(Instructor, this.toPersistence(instructorEntity));
        return this.toDomain(saved);
    }

    async update(instructorEntity: InstructorEntity): Promise<BaseResponse> {
        try {
            await manager.save(Instructor, this.toPersistence(instructorEntity));
            return { success: true, message: "Instructor updated successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async findById(id: string): Promise<InstructorEntity | null> {
        const model = await manager.findOne(Instructor, {
            where: { id }
        });
        if (!model) return null;
        return this.toDomain(model);
    }

    async findAll(params?: InstructorParams): Promise<InstructorEntity[]> {
        const query = manager.getRepository(Instructor).createQueryBuilder("instructor");

        if (params?.search) {
            query.andWhere(
                "(instructor.firstName ILIKE :search OR instructor.lastName ILIKE :search OR instructor.email ILIKE :search)",
                { search: `%${params.search}%` }
            );
        }

        if (params?.resultsPerPage) {
            query.take(params.resultsPerPage);
        }
        if (params?.page) {
            const limit = params.resultsPerPage || 10;
            query.skip((params.page - 1) * limit);
        }

        const models = await query.getMany();
        return models.map(m => this.toDomain(m));
    }

    async delete(id: string): Promise<BaseResponse> {
        try {
            const result = await manager.delete(Instructor, id);
            if (result.affected === 0) return { success: false, message: "Instructor not found" };
            return { success: true, message: "Instructor deleted successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}
