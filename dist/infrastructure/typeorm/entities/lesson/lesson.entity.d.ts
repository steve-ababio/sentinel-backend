import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Resource } from "../file/file.entity";
import { Progress } from "../progress/progress.entity";
export declare class Lesson extends BaseEntity {
    title: string;
    videoUrl: string;
    notes: string;
    order: number;
    description: string;
    duration: number;
    module: Module;
    progress: Progress[];
    resource: Resource[] | null;
}
