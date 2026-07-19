import { BaseEntity } from "../base/base.entity";
import { User } from "../user/user.entity";
import { Test } from "./test.entity";
export declare class TestSubmission extends BaseEntity {
    user: User;
    userId: string;
    test: Test;
    testId: string;
    score: number;
    answers: Record<string, string>;
}
