import { ResourceEntity } from "./resource.entity";
export declare class LessonEntity {
    title: string;
    videoUrl: string;
    notes: string | null;
    order: number;
    description: string;
    duration: number;
    id?: string | undefined;
    moduleId?: string | undefined;
    resources?: ResourceEntity[] | undefined;
    constructor(title: string, videoUrl: string, notes: string | null, order: number, description: string, duration: number, id?: string | undefined, moduleId?: string | undefined, resources?: ResourceEntity[] | undefined);
}
