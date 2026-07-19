"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const course_entity_1 = require("@domain/models/entities/course.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const course_entity_2 = require("@infrastructure/typeorm/entities/course/course.entity");
const tsyringe_1 = require("tsyringe");
const types_1 = require("@common/global/types");
const review_entity_1 = require("@infrastructure/typeorm/entities/review/review.entity");
const instructor_entity_1 = require("@domain/models/entities/instructor.entity");
const instructor_entity_2 = require("@infrastructure/typeorm/entities/instructor/instructor.entity");
let CourseRepository = class CourseRepository {
    toPersistence(course) {
        const courseModel = new course_entity_2.Course();
        if (course.id)
            courseModel.id = course.id;
        if (course.title !== undefined || course.title !== null)
            courseModel.title = course.title;
        if (course.description !== undefined || course.description !== null)
            courseModel.description = course.description;
        if (course.thumbnail !== undefined || course.thumbnail !== null)
            courseModel.thumbnail = course.thumbnail;
        if (course.isPopular !== undefined || course.isPopular !== null)
            courseModel.isPopular = course.isPopular;
        if (course.provider !== undefined || course.provider !== null)
            courseModel.provider = course.provider;
        if (course.approvalRate !== undefined || course.approvalRate !== null)
            courseModel.approvalRate = course.approvalRate;
        if (course.difficulty !== undefined || course.difficulty !== null)
            courseModel.difficulty = course.difficulty;
        if (course.price !== undefined || course.price !== null)
            courseModel.price = course.price;
        if (course.enrolledCount !== undefined || course.enrolledCount)
            courseModel.enrolledCount = course.enrolledCount;
        if (course.enrolledCount !== undefined || course.enrolledCount !== null)
            courseModel.enrolledCount = course.enrolledCount;
        if (course.languages)
            courseModel.languages = course.languages;
        if (course.specialization)
            courseModel.specialization = course.specialization;
        if (course.pricingModel)
            courseModel.pricingModel = course.pricingModel;
        if (course.expectedExperience)
            courseModel.expectedExperience = course.expectedExperience;
        if (course.skillsGained)
            courseModel.skillsGained = course.skillsGained;
        if (course.instructorId) {
            const inst = new instructor_entity_2.Instructor();
            inst.id = course.instructorId;
            courseModel.instructor = inst;
        }
        return courseModel;
    }
    toDomain(course) {
        let instructorEntity = null;
        if (course.instructor) {
            instructorEntity = new instructor_entity_1.InstructorEntity(course.instructor.email, course.instructor.firstName, course.instructor.lastName, course.instructor.profilePicture, course.instructor.role, course.instructor.specialization, course.instructor.phoneNumber, course.instructor.bio, course.instructor.id, course.instructor.averageRating, course.instructor.reviewCount);
        }
        const enrollmentCount = course.enrollments.length;
        return new course_entity_1.CourseEntity(course.title, course.description, course.thumbnail, course.isPopular, course.skillsGained, course.provider, course.expectedExperience, course.approvalRate, course.languages, course.price, course.pricingModel, enrollmentCount, course.specialization, [], course.difficulty, [], course.id, instructorEntity, course.instructor?.id);
    }
    async create(course) {
        const courseEntity = await data_source_1.manager.save(course_entity_2.Course, this.toPersistence(course));
        return this.toDomain(courseEntity);
    }
    async update(course) {
        try {
            await data_source_1.manager.save(course_entity_2.Course, this.toPersistence(course));
            return { success: true, message: "Course updated successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findById(courseId) {
        const courseEntity = await data_source_1.manager.findOne(course_entity_2.Course, {
            where: { id: courseId },
            relations: ["instructor", "enrollments"]
        });
        if (!courseEntity)
            return null;
        if (courseEntity.instructor) {
            const instructorId = courseEntity.instructor.id;
            const stats = await data_source_1.manager.createQueryBuilder(review_entity_1.Review, "review")
                .select("AVG(review.rating)", "average")
                .addSelect("COUNT(review.id)", "count")
                .where("review.entityId = :instructorId", { instructorId })
                .andWhere("review.entityType = :entityType", { entityType: types_1.EntityType.INSTRUCTOR })
                .getRawOne();
            courseEntity.instructor.averageRating = stats?.average ? parseFloat(Number(stats.average).toFixed(1)) : 0;
            courseEntity.instructor.reviewCount = stats?.count ? parseInt(stats.count) : 0;
        }
        return this.toDomain(courseEntity);
    }
    async findAll(params) {
        const query = data_source_1.manager.getRepository(course_entity_2.Course).createQueryBuilder("course");
        query.leftJoinAndSelect("course.enrollments", "enrollments");
        if (params?.search) {
            query.andWhere("course.title ILIKE :search", { search: `%${params.search}%` });
        }
        if (params?.isPopular !== undefined) {
            query.andWhere("course.isPopular = :isPopular", { isPopular: params.isPopular });
        }
        if (params?.resultsPerPage) {
            query.take(params.resultsPerPage);
        }
        if (params?.page) {
            const limit = params.resultsPerPage || 10;
            query.skip((params.page - 1) * limit);
        }
        const totalRecords = await query.getCount();
        const courses = await query.getMany();
        return { success: true, totalRecords: totalRecords, details: courses.map(this.toDomain) };
    }
    async delete(courseId) {
        try {
            const result = await data_source_1.manager.delete(course_entity_2.Course, courseId);
            if (result.affected === 0)
                return { success: false, message: "Course not found" };
            return { success: true, message: "Course deleted successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = __decorate([
    (0, tsyringe_1.injectable)()
], CourseRepository);
