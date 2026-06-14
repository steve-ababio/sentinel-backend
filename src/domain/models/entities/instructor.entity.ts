export class InstructorEntity {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public profilePicture?: string,
        public role?: string,
        public specialization?: string,
        public phoneNumber?: string,
        public bio?: string,
        public id?: string,
        public averageRating?: number,
        public reviewCount?: number,
        public coursesCount?: number
    ) {}
}
