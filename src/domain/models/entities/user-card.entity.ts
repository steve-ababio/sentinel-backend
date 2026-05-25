export class UserCardEntity {
    constructor(
        public userId: string,
        public cardToken: string,
        public last4: string,
        public brand: string,
        public expMonth: number,
        public expYear: number,
        public isDefault: boolean,
        public id?: string
    ) {}
}
