import { EnrollmentStatus } from "@common/global/types";

export class EnrollmentEntity {
    constructor(
        public enrollmentStatus:EnrollmentStatus,
        public userId:string,
        public courseId:string,
        public id?:string,
        public course?: any
    ) {}

}