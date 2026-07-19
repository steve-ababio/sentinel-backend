"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRepository = void 0;
const module_entity_1 = require("@domain/models/entities/module.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const module_entity_2 = require("@infrastructure/typeorm/entities/module/module.entity");
const course_entity_1 = require("@infrastructure/typeorm/entities/course/course.entity");
const test_entity_1 = require("@infrastructure/typeorm/entities/test/test.entity");
const question_entity_1 = require("@infrastructure/typeorm/entities/question/question.entity");
const tsyringe_1 = require("tsyringe");
let ModuleRepository = class ModuleRepository {
    toPersistence(moduleEntity) {
        const moduleModel = new module_entity_2.Module();
        if (moduleEntity.id)
            moduleModel.id = moduleEntity.id;
        moduleModel.title = moduleEntity.title;
        moduleModel.order = moduleEntity.order;
        moduleModel.estimatedTime = moduleEntity.estimatedTime;
        moduleModel.moduleDetails = moduleEntity.moduleDetails || "";
        if (moduleEntity.courseId) {
            const course = new course_entity_1.Course();
            course.id = moduleEntity.courseId;
            moduleModel.course = course;
        }
        return moduleModel;
    }
    toDomain(moduleModel) {
        const lessons = moduleModel.lessons ? moduleModel.lessons.map(l => ({
            title: l.title,
            description: l.description,
            duration: l.duration,
            videoUrl: l.videoUrl,
            notes: l.notes,
            order: l.order,
            id: l.id,
            moduleId: moduleModel.id,
            resources: l.resource ? l.resource.map(r => ({
                id: r.id,
                filename: r.filename,
                type: r.type,
                url: r.url,
                mimeType: r.mimeType,
                readonly: r.readonly
            })) : []
        })) : [];
        const testMapped = moduleModel.test ? {
            id: moduleModel.test.id,
            title: moduleModel.test.title,
            timeLimit: moduleModel.test.timeLimit,
            allowedAttempts: moduleModel.test.allowedAttempts,
            questions: moduleModel.test.questions ? moduleModel.test.questions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.options
            })) : []
        } : null;
        return new module_entity_1.ModuleEntity(moduleModel.title, moduleModel.order, lessons, moduleModel.estimatedTime, moduleModel.moduleDetails, moduleModel.course?.id, moduleModel.id, testMapped);
    }
    async seedTestForModule(moduleId) {
        const existingTest = await data_source_1.manager.findOne(test_entity_1.Test, {
            where: { moduleId },
            relations: ["questions"]
        });
        if (existingTest) {
            return existingTest;
        }
        const test = new test_entity_1.Test();
        test.title = "Module Knowledge Assessment";
        test.timeLimit = 15;
        test.allowedAttempts = 3;
        test.moduleId = moduleId;
        const savedTest = await data_source_1.manager.save(test_entity_1.Test, test);
        const q1 = new question_entity_1.Question();
        q1.text = "What is the primary role of a Sentinel in system monitoring?";
        q1.options = [
            { id: "1", text: "To encrypt communications between nodes", points: 0, isCorrect: false },
            { id: "2", text: "To actively scan, intercept, and block unauthorized traffic anomalies in real-time", points: 10, isCorrect: true },
            { id: "3", text: "To store transaction history records in cold storage logs", points: 0, isCorrect: false },
            { id: "4", text: "To deploy cloud servers on-demand automatically", points: 0, isCorrect: false }
        ];
        q1.testId = savedTest.id;
        const q2 = new question_entity_1.Question();
        q2.text = "Which mechanism is best suited to guarantee payload integrity during webhook transfers?";
        q2.options = [
            { id: "1", text: "Standard CORS header policy restrictions", points: 0, isCorrect: false },
            { id: "2", text: "Cryptographic HMAC signatures matched against secret tokens", points: 10, isCorrect: true },
            { id: "3", text: "SSL certificate generation on every transaction", points: 0, isCorrect: false }
        ];
        q2.testId = savedTest.id;
        const q3 = new question_entity_1.Question();
        q3.text = "How does the Paystack webhook callback report successful card authorization charges?";
        q3.options = [
            { id: "1", text: "Via a client-side alert popup response", points: 0, isCorrect: false },
            { id: "2", text: "By posting a charge.success event containing metadata details", points: 10, isCorrect: true },
            { id: "3", text: "By initiating an automated refund transaction", points: 0, isCorrect: false }
        ];
        q3.testId = savedTest.id;
        await data_source_1.manager.save(question_entity_1.Question, [q1, q2, q3]);
        savedTest.questions = [q1, q2, q3];
        return savedTest;
    }
    async save(moduleEntity) {
        const savedModule = await data_source_1.manager.save(module_entity_2.Module, this.toPersistence(moduleEntity));
        return this.toDomain(savedModule);
    }
    async findById(moduleId) {
        const moduleModel = await data_source_1.manager.findOne(module_entity_2.Module, {
            where: { id: moduleId },
            relations: ["course", "lessons", "lessons.resource", "test", "test.questions"]
        });
        if (!moduleModel)
            return null;
        if (!moduleModel.test) {
            moduleModel.test = await this.seedTestForModule(moduleModel.id);
        }
        return this.toDomain(moduleModel);
    }
    async findByCourse(courseId) {
        const modules = await data_source_1.manager.find(module_entity_2.Module, {
            where: { course: { id: courseId } },
            relations: ["course", "lessons", "lessons.resource", "test", "test.questions"],
            order: { order: "ASC" }
        });
        for (const m of modules) {
            if (!m.test) {
                m.test = await this.seedTestForModule(m.id);
            }
        }
        return modules.map(m => this.toDomain(m));
    }
    async delete(moduleId) {
        try {
            const result = await data_source_1.manager.delete(module_entity_2.Module, moduleId);
            if (result.affected === 0)
                return { success: false, message: "Module not found" };
            return { success: true, message: "Module deleted successfully" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.ModuleRepository = ModuleRepository;
exports.ModuleRepository = ModuleRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ModuleRepository);
