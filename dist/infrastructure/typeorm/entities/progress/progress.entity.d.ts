import { Lesson } from "../lesson/lesson.entity";
import { User } from "../user/user.entity";
import { BaseEntity } from "../base/base.entity";
export declare class Progress extends BaseEntity {
    user: User;
    lesson: Lesson;
    completed: boolean;
    lastPosition: number;
}
