import { FileMimeType, FileType } from "@common/global/types";

export class ResourceEntity {
    constructor(
        public id: string,
        public filename: string,
        public type: FileType,
        public url: string,
        public mimeType?: FileMimeType | null,
        public readonly?: boolean,
    ) {
    }
}