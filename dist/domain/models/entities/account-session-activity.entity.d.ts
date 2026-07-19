import { AccountSessionStatus } from "@common/auth/enum";
export declare class AccountSessionActivityEntity {
    userId: string;
    deviceType: string;
    os: string;
    status: AccountSessionStatus;
    id?: string | undefined;
    constructor(userId: string, deviceType: string, os: string, status: AccountSessionStatus, id?: string | undefined);
}
