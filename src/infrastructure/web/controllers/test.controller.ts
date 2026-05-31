import { manager } from "@infrastructure/typeorm/data-source";
import { Test } from "@infrastructure/typeorm/entities/test/test.entity";
import { TestSubmission } from "@infrastructure/typeorm/entities/test/test-submission.entity";
import { STATUS_CODES } from "@common/web/status-codes";
import { createLogger } from "../util/logger";
import { handleRouteError } from "@common/global/utils";

const logger = createLogger('CONTROLLER', 'TEST');

export class TestController {
  
  async getTestByModule(ctx: any) {
    try {
      const { moduleId } = ctx.params;
      const userId = ctx.state.jwtPayload.id;

      const test = await manager.findOne(Test, {
        where: { moduleId },
        relations: ["questions"]
      });

      if (!test) {
        ctx.status = STATUS_CODES.NOT_FOUND;
        ctx.body = { message: "Test not found for this module" };
        return;
      }

      // Fetch user's previous submissions for this test
      const submissions = await manager.find(TestSubmission, {
        where: { testId: test.id, userId },
        order: { createdAt: "DESC" }
      });

      const highestScore = submissions.length > 0 
        ? Math.max(...submissions.map(s => s.score)) 
        : null;

      ctx.status = STATUS_CODES.OK;
      ctx.body = {
        test,
        submissions,
        highestScore
      };
    } catch (error) {
      handleRouteError(error, ctx, logger);
    }
  }

  async getCourseSubmissions(ctx: any) {
    try {
      const { courseId } = ctx.params;
      const userId = ctx.state.jwtPayload.id;

      const submissions = await manager.find(TestSubmission, {
        where: {
          userId,
          test: { module: { course: { id: courseId } } }
        },
        relations: ["test"]
      });

      ctx.status = STATUS_CODES.OK;
      ctx.body = submissions;
    } catch (error) {
      handleRouteError(error, ctx, logger);
    }
  }

  async submitTest(ctx: any) {
    try {
      const { testId } = ctx.params;
      const userId = ctx.state.jwtPayload.id;
      const { answers } = ctx.request.body; // Map of questionId -> optionId

      const test = await manager.findOne(Test, {
        where: { id: testId },
        relations: ["questions"]
      });

      if (!test) {
        ctx.status = STATUS_CODES.NOT_FOUND;
        ctx.body = { message: "Test not found" };
        return;
      }

      // Check allowed attempts limit
      const attemptsCount = await manager.count(TestSubmission, {
        where: { testId: test.id, userId }
      });

      if (attemptsCount >= test.allowedAttempts) {
        ctx.status = STATUS_CODES.BAD_REQUEST;
        ctx.body = { message: "Maximum attempts limit reached for this assessment." };
        return;
      }

      // Calculate score
      let totalPointsPossible = 0;
      let totalPointsEarned = 0;

      for (const q of test.questions) {
        // Correct options or points are stored inside question.options
        const maxPoints = q.options.reduce((max, opt) => opt.points > max ? opt.points : max, 0);
        totalPointsPossible += maxPoints || 10; // Default to 10 points per question if none

        const selectedOptionId = answers?.[q.id];
        const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
        if (selectedOption) {
          totalPointsEarned += selectedOption.points || 0;
        }
      }

      const scorePercentage = totalPointsPossible > 0 
        ? (totalPointsEarned / totalPointsPossible) * 100 
        : 0;

      // Save submission
      const submission = new TestSubmission();
      submission.userId = userId;
      submission.testId = test.id;
      submission.score = Math.round(scorePercentage * 10) / 10; // Round to 1 decimal place
      submission.answers = answers || {};
      
      const savedSubmission = await manager.save(TestSubmission, submission);

      ctx.status = STATUS_CODES.OK;
      ctx.body = {
        success: true,
        submission: savedSubmission,
        earnedPoints: totalPointsEarned,
        totalPoints: totalPointsPossible
      };
    } catch (error) {
      handleRouteError(error, ctx, logger);
    }
  }
}
