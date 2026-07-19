import { EnrollmentStatus } from "@common/global/types";
export declare class EnrollmentEntity {
    enrollmentStatus: EnrollmentStatus;
    userId: string;
    courseId: string;
    id?: string | undefined;
    course?: any | undefined;
    constructor(enrollmentStatus: EnrollmentStatus, userId: string, courseId: string, id?: string | undefined, course?: any | undefined);
}
