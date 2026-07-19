"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRepository = void 0;
const types_1 = require("@common/global/types");
const instructor_entity_1 = require("@domain/models/entities/instructor.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const instructor_entity_2 = require("@infrastructure/typeorm/entities/instructor/instructor.entity");
const course_entity_1 = require("@infrastructure/typeorm/entities/course/course.entity");
const review_entity_1 = require("@infrastructure/typeorm/entities/review/review.entity");
const tsyringe_1 = require("tsyringe");
let InstructorRepository = class InstructorRepository {
    toPersistence(domain) {
        const model = new instructor_entity_2.Instructor();
        if (domain.id)
            model.id = domain.id;
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
    toDomain(model) {
        return new instructor_entity_1.InstructorEntity(model.email, model.firstName, model.lastName, model.profilePicture, model.role, model.specialization, model.phoneNumber, model.bio, model.id);
    }
    async create(instructorEntity) {
        const saved = await data_source_1.manager.save(instructor_entity_2.Instructor, this.toPersistence(instructorEntity));
        return this.toDomain(saved);
    }
    async update(instructorEntity) {
        try {
            await data_source_1.manager.save(instructor_entity_2.Instructor, this.toPersistence(instructorEntity));
            return { success: true, message: "Instructor updated successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findById(id) {
        const model = await data_source_1.manager.findOne(instructor_entity_2.Instructor, {
            where: { id }
        });
        if (!model)
            return null;
        const coursesCount = await data_source_1.manager.getRepository(course_entity_1.Course).count({
            where: { instructor: { id: model.id } }
        });
        const stats = await data_source_1.manager.createQueryBuilder(review_entity_1.Review, "review")
            .select("AVG(review.rating)", "average")
            .addSelect("COUNT(review.id)", "count")
            .where("review.entityId = :instructorId", { instructorId: model.id })
            .andWhere("review.entityType = :entityType", { entityType: types_1.EntityType.INSTRUCTOR })
            .getRawOne();
        const avgRating = stats?.average ? parseFloat(Number(stats.average).toFixed(1)) : 0;
        const revCount = stats?.count ? parseInt(stats.count, 10) : 0;
        return new instructor_entity_1.InstructorEntity(model.email, model.firstName, model.lastName, model.profilePicture, model.role, model.specialization, model.phoneNumber, model.bio, model.id, avgRating, revCount, coursesCount);
    }
    async findAll(params) {
        const query = data_source_1.manager.getRepository(instructor_entity_2.Instructor).createQueryBuilder("instructor");
        if (params?.search) {
            query.andWhere("(instructor.firstName ILIKE :search OR instructor.lastName ILIKE :search OR instructor.email ILIKE :search)", { search: `%${params.search}%` });
        }
        if (params?.resultsPerPage) {
            query.take(params.resultsPerPage);
        }
        if (params?.page) {
            const limit = params.resultsPerPage || 10;
            query.skip((params.page - 1) * limit);
        }
        const models = await query.getMany();
        const entities = [];
        for (const m of models) {
            const coursesCount = await data_source_1.manager.getRepository(course_entity_1.Course).count({
                where: { instructor: { id: m.id } }
            });
            const stats = await data_source_1.manager.createQueryBuilder(review_entity_1.Review, "review")
                .select("AVG(review.rating)", "average")
                .addSelect("COUNT(review.id)", "count")
                .where("review.entityId = :instructorId", { instructorId: m.id })
                .andWhere("review.entityType = :entityType", { entityType: types_1.EntityType.INSTRUCTOR })
                .getRawOne();
            const avgRating = stats?.average ? parseFloat(Number(stats.average).toFixed(1)) : 0;
            const revCount = stats?.count ? parseInt(stats.count, 10) : 0;
            entities.push(new instructor_entity_1.InstructorEntity(m.email, m.firstName, m.lastName, m.profilePicture, m.role, m.specialization, m.phoneNumber, m.bio, m.id, avgRating, revCount, coursesCount));
        }
        return entities;
    }
    async delete(id) {
        try {
            const result = await data_source_1.manager.delete(instructor_entity_2.Instructor, id);
            if (result.affected === 0)
                return { success: false, message: "Instructor not found" };
            return { success: true, message: "Instructor deleted successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.InstructorRepository = InstructorRepository;
exports.InstructorRepository = InstructorRepository = __decorate([
    (0, tsyringe_1.injectable)()
], InstructorRepository);
