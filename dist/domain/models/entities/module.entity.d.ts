import { LessonEntity } from "./lesson.entity";
export declare class ModuleEntity {
    title: string;
    order: number;
    lessons: LessonEntity[];
    estimatedTime: string;
    moduleDetails: string | null;
    courseId?: string | undefined;
    id?: string | undefined;
    test?: any | undefined;
    constructor(title: string, order: number, lessons: LessonEntity[], estimatedTime: string, moduleDetails: string | null, courseId?: string | undefined, id?: string | undefined, test?: any | undefined);
}
