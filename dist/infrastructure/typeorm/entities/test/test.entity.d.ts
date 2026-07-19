import { BaseEntity } from "../base/base.entity";
import { Module } from "../module/module.entity";
import { Question } from "../question/question.entity";
import { TestSubmission } from "./test-submission.entity";
export declare class Test extends BaseEntity {
    title: string;
    timeLimit: number;
    allowedAttempts: number;
    moduleId: string;
    module: Module;
    questions: Question[];
    submissions: TestSubmission[];
}
