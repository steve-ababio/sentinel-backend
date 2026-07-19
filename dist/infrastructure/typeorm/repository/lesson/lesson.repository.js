"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const lesson_entity_1 = require("@domain/models/entities/lesson.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const lesson_entity_2 = require("@infrastructure/typeorm/entities/lesson/lesson.entity");
const module_entity_1 = require("@infrastructure/typeorm/entities/module/module.entity");
const tsyringe_1 = require("tsyringe");
const file_entity_1 = require("@infrastructure/typeorm/entities/file/file.entity");
let LessonRepository = class LessonRepository {
    toPersistence(lessonEntity) {
        const lessonModel = new lesson_entity_2.Lesson();
        if (lessonEntity.id)
            lessonModel.id = lessonEntity.id;
        lessonModel.title = lessonEntity.title;
        lessonModel.videoUrl = lessonEntity.videoUrl;
        lessonModel.notes = lessonEntity.notes || "";
        lessonModel.order = lessonEntity.order;
        lessonModel.description = lessonEntity.description;
        lessonModel.duration = lessonEntity.duration;
        if (lessonEntity.moduleId) {
            const moduleModel = new module_entity_1.Module();
            moduleModel.id = lessonEntity.moduleId;
            lessonModel.module = moduleModel;
        }
        if (lessonEntity.resources) {
            lessonModel.resource = lessonEntity.resources.map(r => {
                const res = new file_entity_1.Resource();
                if (r.id)
                    res.id = r.id;
                res.filename = r.filename;
                res.type = r.type;
                res.url = r.url;
                res.mimeType = r.mimeType;
                res.readonly = !!r.readonly;
                return res;
            });
        }
        return lessonModel;
    }
    toDomain(lessonModel) {
        return new lesson_entity_1.LessonEntity(lessonModel.title, lessonModel.videoUrl, lessonModel.notes, lessonModel.order, lessonModel.description, lessonModel.duration, lessonModel.id, lessonModel.module?.id, lessonModel.resource ? lessonModel.resource.map(r => ({
            id: r.id,
            filename: r.filename,
            type: r.type,
            url: r.url,
            mimeType: r.mimeType,
            readonly: r.readonly
        })) : []);
    }
    async findByModule(moduleId) {
        const lessons = await data_source_1.manager.find(lesson_entity_2.Lesson, {
            where: { module: { id: moduleId } },
            relations: ["module", "resource"],
            order: { order: "ASC" }
        });
        return lessons.map(l => this.toDomain(l));
    }
    async findById(lessonId) {
        const lesson = await data_source_1.manager.findOne(lesson_entity_2.Lesson, {
            where: { id: lessonId },
            relations: ["module", "resource"]
        });
        if (!lesson)
            return null;
        return this.toDomain(lesson);
    }
    async findNextLesson(courseId, currentLessonOrder) {
        const query = data_source_1.manager.getRepository(lesson_entity_2.Lesson).createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.module", "module")
            .where("module.courseId = :courseId", { courseId })
            .andWhere("lesson.order > :currentLessonOrder", { currentLessonOrder })
            .orderBy("lesson.order", "ASC");
        const lesson = await query.getOne();
        if (!lesson)
            return null;
        return this.toDomain(lesson);
    }
    async findPreviousLesson(courseId, currentLessonOrder) {
        const query = data_source_1.manager.getRepository(lesson_entity_2.Lesson).createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.module", "module")
            .where("module.courseId = :courseId", { courseId })
            .andWhere("lesson.order < :currentLessonOrder", { currentLessonOrder })
            .orderBy("lesson.order", "DESC");
        const lesson = await query.getOne();
        if (!lesson)
            return null;
        return this.toDomain(lesson);
    }
    async countByCourse(courseId) {
        return data_source_1.manager.count(lesson_entity_2.Lesson, {
            where: { module: { course: { id: courseId } } }
        });
    }
    async create(lessonEntity) {
        const persistenceModel = this.toPersistence(lessonEntity);
        if (persistenceModel.resource) {
            for (let i = 0; i < persistenceModel.resource.length; i++) {
                persistenceModel.resource[i] = await data_source_1.manager.save(file_entity_1.Resource, persistenceModel.resource[i]);
            }
        }
        const savedLesson = await data_source_1.manager.save(lesson_entity_2.Lesson, persistenceModel);
        return this.toDomain(savedLesson);
    }
    async delete(lessonId) {
        await data_source_1.manager.delete(lesson_entity_2.Lesson, lessonId);
    }
};
exports.LessonRepository = LessonRepository;
exports.LessonRepository = LessonRepository = __decorate([
    (0, tsyringe_1.injectable)()
], LessonRepository);
