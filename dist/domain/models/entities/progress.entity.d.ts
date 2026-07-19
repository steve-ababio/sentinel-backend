export declare class ProgressEntity {
    completed: boolean;
    lastPosition: number;
    userId: string;
    lessonId?: string | undefined;
    constructor(completed: boolean, lastPosition: number, userId: string, lessonId?: string | undefined);
}
