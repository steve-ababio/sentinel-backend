import { BaseResponse, EnrollmentStatus } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
export declare class EnrollmentRepository implements EnrollmentPersistencePort {
    private toPersistence;
    private toDomain;
    create(enrollmentEntity: EnrollmentEntity): Promise<BaseResponse>;
    findByIds(userId: string, courseId: string): Promise<BaseResponse>;
    findAllByUserId(userId: string): Promise<EnrollmentEntity[]>;
    getLeagueTable(courseId: string): Promise<any[]>;
    updateStatus(userId: string, courseId: string, status: EnrollmentStatus): Promise<BaseResponse>;
}
