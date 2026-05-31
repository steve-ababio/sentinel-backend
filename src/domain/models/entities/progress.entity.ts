export class ProgressEntity {
    constructor(
        public completed:boolean,
        public lastPosition:number,
        public userId:string,
        public lessonId?:string,
    ) {}

}