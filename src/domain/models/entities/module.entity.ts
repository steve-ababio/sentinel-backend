import { LessonEntity } from "./lesson.entity";

export class ModuleEntity {
    constructor(
        public title:string,
        public order:number,
        public lessons:LessonEntity[],
        public estimatedTime:string,
        public moduleDetails:string | null,
        public courseId?:string,
        public id?:string,
    ) {}

}