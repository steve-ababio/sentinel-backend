import { BaseEntity } from "../base/base.entity";
import { Course } from "../course/course.entity";
import { Lesson } from "../lesson/lesson.entity";
import { Test } from "../test/test.entity";
export declare class Module extends BaseEntity {
    title: string;
    order: number;
    estimatedTime: string;
    moduleDetails: string;
    course: Course;
    lessons: Lesson[];
    test: Test | null;
}
