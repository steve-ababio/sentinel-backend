import { BaseEntity } from "../base/base.entity";
export declare class Instructor extends BaseEntity {
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    role?: string;
    specialization?: string;
    phoneNumber?: string;
    bio?: string;
}
