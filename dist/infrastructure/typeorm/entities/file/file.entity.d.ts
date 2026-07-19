import { BaseEntity } from "../base/base.entity";
import { FileMimeType, FileType } from "@common/global/types";
import { Lesson } from "../lesson/lesson.entity";
export declare class Resource extends BaseEntity {
    filename: string;
    type: FileType;
    url: string;
    mimeType: FileMimeType | null;
    readonly: boolean;
    lesson: Lesson[] | null;
}
