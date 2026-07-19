"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const data_source_1 = require("@infrastructure/typeorm/data-source");
const test_entity_1 = require("@infrastructure/typeorm/entities/test/test.entity");
const test_submission_entity_1 = require("@infrastructure/typeorm/entities/test/test-submission.entity");
const status_codes_1 = require("@common/web/status-codes");
const logger_1 = require("../util/logger");
const utils_1 = require("@common/global/utils");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'TEST');
class TestController {
    async getTestByModule(ctx) {
        try {
            const { moduleId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const test = await data_source_1.manager.findOne(test_entity_1.Test, {
                where: { moduleId },
                relations: ["questions"]
            });
            if (!test) {
                ctx.status = status_codes_1.STATUS_CODES.NOT_FOUND;
                ctx.body = { message: "Test not found for this module" };
                return;
            }
            const submissions = await data_source_1.manager.find(test_submission_entity_1.TestSubmission, {
                where: { testId: test.id, userId },
                order: { createdAt: "DESC" }
            });
            const highestScore = submissions.length > 0
                ? Math.max(...submissions.map(s => s.score))
                : null;
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                test,
                submissions,
                highestScore
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async getCourseSubmissions(ctx) {
        try {
            const { courseId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const submissions = await data_source_1.manager.find(test_submission_entity_1.TestSubmission, {
                where: {
                    userId,
                    test: { module: { course: { id: courseId } } }
                },
                relations: ["test"]
            });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = submissions;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async submitTest(ctx) {
        try {
            const { testId } = ctx.params;
            const userId = ctx.state.jwtPayload.id;
            const { answers } = ctx.request.body;
            const test = await data_source_1.manager.findOne(test_entity_1.Test, {
                where: { id: testId },
                relations: ["questions"]
            });
            if (!test) {
                ctx.status = status_codes_1.STATUS_CODES.NOT_FOUND;
                ctx.body = { message: "Test not found" };
                return;
            }
            const attemptsCount = await data_source_1.manager.count(test_submission_entity_1.TestSubmission, {
                where: { testId: test.id, userId }
            });
            if (attemptsCount >= test.allowedAttempts) {
                ctx.status = status_codes_1.STATUS_CODES.BAD_REQUEST;
                ctx.body = { message: "Maximum attempts limit reached for this assessment." };
                return;
            }
            let totalPointsPossible = 0;
            let totalPointsEarned = 0;
            for (const q of test.questions) {
                const maxPoints = q.options.reduce((max, opt) => opt.points > max ? opt.points : max, 0);
                totalPointsPossible += maxPoints || 10;
                const selectedOptionId = answers?.[q.id];
                const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
                if (selectedOption) {
                    totalPointsEarned += selectedOption.points || 0;
                }
            }
            const scorePercentage = totalPointsPossible > 0
                ? (totalPointsEarned / totalPointsPossible) * 100
                : 0;
            const submission = new test_submission_entity_1.TestSubmission();
            submission.userId = userId;
            submission.testId = test.id;
            submission.score = Math.round(scorePercentage * 10) / 10;
            submission.answers = answers || {};
            const savedSubmission = await data_source_1.manager.save(test_submission_entity_1.TestSubmission, submission);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                success: true,
                submission: savedSubmission,
                earnedPoints: totalPointsEarned,
                totalPoints: totalPointsPossible
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
}
exports.TestController = TestController;
