import { ProgressEntity } from "@domain/models/entities/progress.entity";
import { ProgressPersistencePort } from "@ports/out/persistence/progress.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Progress } from "@infrastructure/typeorm/entities/progress/progress.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { Lesson } from "@infrastructure/typeorm/entities/lesson/lesson.entity";
import { injectable } from "tsyringe";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { CourseEntity } from "@domain/models/entities/course.entity";
import { LessonEntity } from "@domain/models/entities/lesson.entity";

@injectable()
export class ProgressRepository implements ProgressPersistencePort {

    private toPersistence(progressEntity: ProgressEntity, lessonId: string): Progress {
        const progressModel = new Progress();
        progressModel.completed = progressEntity.completed;
        progressModel.lastPosition = progressEntity.lastPosition;

        const user = new User();
        user.id = progressEntity.userId;
        progressModel.user = user;

        const lesson = new Lesson();
        lesson.id = lessonId;
        progressModel.lesson = lesson;

        return progressModel;
    }

    private toDomain(progressModel: Progress): ProgressEntity {
        return new ProgressEntity(
            progressModel.completed,
            progressModel.lastPosition,
            progressModel.user?.id
        );
    }

    private toLessonDomain(lessonModel: Lesson): LessonEntity {
        return new LessonEntity(
            lessonModel.title,
            lessonModel.videoUrl,
            lessonModel.notes,
            lessonModel.order,
            lessonModel.description,
            lessonModel.duration,
            lessonModel.id,
            lessonModel.module?.id,
        );
    }

    async update(progressEntity: ProgressEntity, lessonId: string): Promise<void> {
        const progressModel = this.toPersistence(progressEntity, lessonId);
        // We find the existing progress based on user and lesson
        const existing = await manager.findOne(Progress, {
            where: { user: { id: progressEntity.userId }, lesson: { id: lessonId } }
        });
        
        if (existing) {
            existing.completed = progressEntity.completed;
            existing.lastPosition = progressEntity.lastPosition;
            await manager.save(Progress, existing);
        } else {
            await manager.save(Progress, progressModel);
        }
    }

    async save(progressEntity: ProgressEntity, lessonId: string): Promise<void> {
        const progressModel = this.toPersistence(progressEntity, lessonId);
        await manager.save(Progress, progressModel);
    }

    async findByLesson(userId: string, lessonId: string): Promise<ProgressEntity | null> {
        const progressModel = await manager.findOne(Progress, {
            where: { user: { id: userId }, lesson: { id: lessonId } },
            relations: ["user"]
        });
        if (!progressModel) return null;
        return this.toDomain(progressModel);
    }

    async findCourseProgress(userId: string, courseId: string): Promise<ProgressEntity[]> {
        const progressModels = await manager.find(Progress, {
            where: { user: { id: userId }, lesson: { module: { course: { id: courseId } } } },
            relations: ["user", "lesson", "lesson.module", "lesson.module.course"]
        });
        return progressModels.map(p => this.toDomain(p));
    }

    async getLastWatchedLesson(userId: string, courseId: string): Promise<LessonEntity | null> {
        // Query to find the most recently updated progress for a course
        const latestProgress = await manager.findOne(Progress, {
            where: { user: { id: userId }, lesson: { module: { course: { id: courseId } } } },
            relations: ["lesson", "lesson.module", "lesson.module.course"],
            order: { updatedAt: "DESC" }
        });

        if (!latestProgress || !latestProgress.lesson) return null;
        return this.toLessonDomain(latestProgress.lesson);
    }
}
