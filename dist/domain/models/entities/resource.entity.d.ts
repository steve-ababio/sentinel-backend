import { FileMimeType, FileType } from "@common/global/types";
export declare class ResourceEntity {
    id: string;
    filename: string;
    type: FileType;
    url: string;
    mimeType?: (FileMimeType | null) | undefined;
    readonly?: boolean | undefined;
    constructor(id: string, filename: string, type: FileType, url: string, mimeType?: (FileMimeType | null) | undefined, readonly?: boolean | undefined);
}
