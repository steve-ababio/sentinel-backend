import { BaseResponse, EnrollmentStatus } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Enrollment } from "@infrastructure/typeorm/entities/enrollment/enrollment.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { injectable } from "tsyringe";

@injectable()
export class EnrollmentRepository implements EnrollmentPersistencePort {

    private toPersistence(enrollmentEntity: EnrollmentEntity): Enrollment {
        const enrollmentModel = new Enrollment();
        if (enrollmentEntity.id) enrollmentModel.id = enrollmentEntity.id;
        enrollmentModel.status = enrollmentEntity.enrollmentStatus;
        
        const user = new User();
        user.id = enrollmentEntity.userId;
        enrollmentModel.user = user;

        const course = new Course();
        course.id = enrollmentEntity.courseId;
        enrollmentModel.course = course;

        return enrollmentModel;
    }

    private toDomain(enrollment: Enrollment): EnrollmentEntity {
        const entity = new EnrollmentEntity(
            enrollment.status,
            enrollment.user?.id,
            enrollment.course?.id,
            enrollment.id
        );
        if (enrollment.course) {
            entity.course = enrollment.course;
        }
        return entity;
    }

    async create(enrollmentEntity: EnrollmentEntity): Promise<BaseResponse> {
        try {
            await manager.save(Enrollment, this.toPersistence(enrollmentEntity));
            return { success: true, message: "Enrollment created successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async findByIds(userId:string, courseId:string): Promise<BaseResponse> {
        try {
            const enrollment = await manager.findOne(Enrollment, {
                where: { 
                    user: { id: userId },
                    course: { id: courseId } 
                }
            });
            if (enrollment) {
                return { success: true, message: "Enrollment found", details: enrollment };
            }
            return { success: false, message: "Enrollment not found" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async findAllByUserId(userId: string): Promise<EnrollmentEntity[]> {
        const enrollments = await manager.find(Enrollment, {
            where: { user: { id: userId } },
            relations: ["course", "user"],
            order: { updatedAt: "DESC" }
        });
        return enrollments.map(e => this.toDomain(e));
    }

    async getLeagueTable(courseId: string): Promise<any[]> {
        // Query enrollments for the course, joining UserInfo to get name and company.
        // For points, we sum the maximum test submission scores for all tests in this course.
        const results = await manager.query(`
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

        return results.map((row: any, index: number) => ({
            rank: index + 1,
            name: `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'Anonymous',
            handle: row.handle,
            company: row.company || 'N/A',
            course: row.course,
            points: Math.round(Number(row.points)), // Accumulated test points (sum of best test scores)
            date: row.date,
            status: row.status,
            profilePicture: row.profilePicture
        }));
    }

    async updateStatus(userId: string, courseId: string, status: EnrollmentStatus): Promise<BaseResponse> {
        try {
            const result = await manager.update(Enrollment, 
                { user: { id: userId }, course: { id: courseId } }, 
                { status }
            );
            if (result.affected && result.affected > 0) {
                return { success: true, message: "Enrollment status updated successfully" };
            }
            return { success: false, message: "Enrollment not found" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}
