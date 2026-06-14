export class UserInfoEntity {
    constructor(
        public userId: string,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?:string,
        public company?: string,
        public profilePicture?:string,
        public id?: string,
        public email?:string,
        public isEmailVerified?: boolean,
        public role?: string,
    ) {}

}