"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRepository = void 0;
const progress_entity_1 = require("@domain/models/entities/progress.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const progress_entity_2 = require("@infrastructure/typeorm/entities/progress/progress.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const lesson_entity_1 = require("@infrastructure/typeorm/entities/lesson/lesson.entity");
const tsyringe_1 = require("tsyringe");
const lesson_entity_2 = require("@domain/models/entities/lesson.entity");
let ProgressRepository = class ProgressRepository {
    toPersistence(progressEntity, lessonId) {
        const progressModel = new progress_entity_2.Progress();
        progressModel.completed = progressEntity.completed;
        progressModel.lastPosition = progressEntity.lastPosition;
        const user = new user_entity_1.User();
        user.id = progressEntity.userId;
        progressModel.user = user;
        const lesson = new lesson_entity_1.Lesson();
        lesson.id = lessonId;
        progressModel.lesson = lesson;
        return progressModel;
    }
    toDomain(progressModel) {
        return new progress_entity_1.ProgressEntity(progressModel.completed, progressModel.lastPosition, progressModel.user?.id, progressModel.lesson?.id);
    }
    toLessonDomain(lessonModel) {
        return new lesson_entity_2.LessonEntity(lessonModel.title, lessonModel.videoUrl, lessonModel.notes, lessonModel.order, lessonModel.description, lessonModel.duration, lessonModel.id, lessonModel.module?.id);
    }
    async update(progressEntity, lessonId) {
        const progressModel = this.toPersistence(progressEntity, lessonId);
        const existing = await data_source_1.manager.findOne(progress_entity_2.Progress, {
            where: { user: { id: progressEntity.userId }, lesson: { id: lessonId } }
        });
        if (existing) {
            existing.completed = progressEntity.completed;
            existing.lastPosition = progressEntity.lastPosition;
            await data_source_1.manager.save(progress_entity_2.Progress, existing);
        }
        else {
            await data_source_1.manager.save(progress_entity_2.Progress, progressModel);
        }
    }
    async save(progressEntity, lessonId) {
        const existing = await data_source_1.manager.findOne(progress_entity_2.Progress, {
            where: { user: { id: progressEntity.userId }, lesson: { id: lessonId } }
        });
        if (existing) {
            existing.completed = progressEntity.completed;
            existing.lastPosition = progressEntity.lastPosition;
            await data_source_1.manager.save(progress_entity_2.Progress, existing);
        }
        else {
            const progressModel = this.toPersistence(progressEntity, lessonId);
            await data_source_1.manager.save(progress_entity_2.Progress, progressModel);
        }
    }
    async findByLesson(userId, lessonId) {
        const progressModel = await data_source_1.manager.findOne(progress_entity_2.Progress, {
            where: { user: { id: userId }, lesson: { id: lessonId } },
            relations: ["user"]
        });
        if (!progressModel)
            return null;
        return this.toDomain(progressModel);
    }
    async findCourseProgress(userId, courseId) {
        const progressModels = await data_source_1.manager.find(progress_entity_2.Progress, {
            where: { user: { id: userId }, lesson: { module: { course: { id: courseId } } } },
            relations: ["user", "lesson", "lesson.module", "lesson.module.course"]
        });
        return progressModels.map(p => this.toDomain(p));
    }
    async getLastWatchedLesson(userId, courseId) {
        const latestProgress = await data_source_1.manager.findOne(progress_entity_2.Progress, {
            where: { user: { id: userId }, lesson: { module: { course: { id: courseId } } } },
            relations: ["lesson", "lesson.module", "lesson.module.course"],
            order: { updatedAt: "DESC" }
        });
        if (!latestProgress || !latestProgress.lesson)
            return null;
        return this.toLessonDomain(latestProgress.lesson);
    }
};
exports.ProgressRepository = ProgressRepository;
exports.ProgressRepository = ProgressRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ProgressRepository);
