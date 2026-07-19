import { BaseEntity } from "../base/base.entity";
import { User } from "../user/user.entity";
import { Course } from "../course/course.entity";
import { EnrollmentStatus } from "@common/global/types";
export declare class Enrollment extends BaseEntity {
    user: User;
    course: Course;
    status: EnrollmentStatus;
}
