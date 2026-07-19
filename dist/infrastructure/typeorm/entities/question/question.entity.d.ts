import { BaseEntity } from "../base/base.entity";
import { Test } from "../test/test.entity";
export interface AnswerOption {
    id: string;
    text: string;
    points: number;
    isCorrect: boolean;
}
export declare class Question extends BaseEntity {
    text: string;
    options: AnswerOption[];
    testId: string;
    test: Test;
}
