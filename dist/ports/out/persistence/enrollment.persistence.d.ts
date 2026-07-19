import { BaseResponse, EnrollmentStatus } from "@common/global/types";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
export interface EnrollmentPersistencePort {
    create(enrollmentEntity: EnrollmentEntity): Promise<BaseResponse>;
    findByIds(userId: string, courseId: string): Promise<BaseResponse>;
    findAllByUserId(userId: string): Promise<EnrollmentEntity[]>;
    getLeagueTable(courseId: string): Promise<any[]>;
    updateStatus(userId: string, courseId: string, status: EnrollmentStatus): Promise<BaseResponse>;
}
