"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const enrollment_entity_1 = require("@domain/models/entities/enrollment.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const enrollment_entity_2 = require("@infrastructure/typeorm/entities/enrollment/enrollment.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const course_entity_1 = require("@infrastructure/typeorm/entities/course/course.entity");
const tsyringe_1 = require("tsyringe");
let EnrollmentRepository = class EnrollmentRepository {
    toPersistence(enrollmentEntity) {
        const enrollmentModel = new enrollment_entity_2.Enrollment();
        if (enrollmentEntity.id)
            enrollmentModel.id = enrollmentEntity.id;
        enrollmentModel.status = enrollmentEntity.enrollmentStatus;
        const user = new user_entity_1.User();
        user.id = enrollmentEntity.userId;
        enrollmentModel.user = user;
        const course = new course_entity_1.Course();
        course.id = enrollmentEntity.courseId;
        enrollmentModel.course = course;
        return enrollmentModel;
    }
    toDomain(enrollment) {
        const entity = new enrollment_entity_1.EnrollmentEntity(enrollment.status, enrollment.user?.id, enrollment.course?.id, enrollment.id);
        if (enrollment.course) {
            entity.course = enrollment.course;
        }
        return entity;
    }
    async create(enrollmentEntity) {
        try {
            await data_source_1.manager.save(enrollment_entity_2.Enrollment, this.toPersistence(enrollmentEntity));
            return { success: true, message: "Enrollment created successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findByIds(userId, courseId) {
        try {
            const enrollment = await data_source_1.manager.findOne(enrollment_entity_2.Enrollment, {
                where: {
                    user: { id: userId },
                    course: { id: courseId }
                }
            });
            if (enrollment) {
                return { success: true, message: "Enrollment found", details: enrollment };
            }
            return { success: false, message: "Enrollment not found" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findAllByUserId(userId) {
        const enrollments = await data_source_1.manager.find(enrollment_entity_2.Enrollment, {
            where: { user: { id: userId } },
            relations: ["course", "user"],
            order: { updatedAt: "DESC" }
        });
        return enrollments.map(e => this.toDomain(e));
    }
    async getLeagueTable(courseId) {
        const results = await data_source_1.manager.query(`
            SELECT 
                u.identifier as handle,
                ui.first_name as "firstName",
                ui.last_name as "lastName",
                ui.company as company,
                ui.profile_picture as "profilePicture",
                e.status as status,
                e.created_at as "date",
                c.title as course,
                COALESCE((
                    SELECT SUM(max_score)
                    FROM (
                        SELECT MAX(ts.score) as max_score, ts.user_id
                        FROM test_submissions ts
                        JOIN tests t ON ts.test_id = t.id
                        JOIN module m ON t.module_id = m.id
                        WHERE m.course_id = $1
                        GROUP BY ts.test_id, ts.user_id
                    ) test_max_scores
                    WHERE test_max_scores.user_id = u.id
                ), 0) as points
            FROM enrollment e
            JOIN "user" u ON e.user_id = u.id
            LEFT JOIN user_info ui ON ui.user_id = u.id
            JOIN course c ON e.course_id = c.id
            WHERE e.course_id = $1
            ORDER BY points DESC, e.created_at ASC
            LIMIT 100
        `, [courseId]);
        return results.map((row, index) => ({
            rank: index + 1,
            name: `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'Anonymous',
            handle: row.handle,
            company: row.company || 'N/A',
            course: row.course,
            points: Math.round(Number(row.points)),
            date: row.date,
            status: row.status,
            profilePicture: row.profilePicture
        }));
    }
    async updateStatus(userId, courseId, status) {
        try {
            const result = await data_source_1.manager.update(enrollment_entity_2.Enrollment, { user: { id: userId }, course: { id: courseId } }, { status });
            if (result.affected && result.affected > 0) {
                return { success: true, message: "Enrollment status updated successfully" };
            }
            return { success: false, message: "Enrollment not found" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.EnrollmentRepository = EnrollmentRepository;
exports.EnrollmentRepository = EnrollmentRepository = __decorate([
    (0, tsyringe_1.injectable)()
], EnrollmentRepository);
