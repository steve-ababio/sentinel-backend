import { BaseResponse } from "@common/global/types";
import { ModuleEntity } from "@domain/models/entities/module.entity";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Module } from "@infrastructure/typeorm/entities/module/module.entity";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { Test } from "@infrastructure/typeorm/entities/test/test.entity";
import { Question } from "@infrastructure/typeorm/entities/question/question.entity";
import { injectable } from "tsyringe";

@injectable()
export class ModuleRepository implements ModulePersistencePort {

    private toPersistence(moduleEntity: ModuleEntity): Module {
        const moduleModel = new Module();
        if (moduleEntity.id) moduleModel.id = moduleEntity.id;
        moduleModel.title = moduleEntity.title;
        moduleModel.order = moduleEntity.order;
        moduleModel.estimatedTime = moduleEntity.estimatedTime;
        moduleModel.moduleDetails = moduleEntity.moduleDetails || "";
        
        if (moduleEntity.courseId) {
            const course = new Course();
            course.id = moduleEntity.courseId;
            moduleModel.course = course;
        }

        return moduleModel;
    }

    private toDomain(moduleModel: Module): ModuleEntity {
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
        } as any)) : [];

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

        return new ModuleEntity(
            moduleModel.title,
            moduleModel.order,
            lessons,
            moduleModel.estimatedTime,
            moduleModel.moduleDetails,
            moduleModel.course?.id,
            moduleModel.id,
            testMapped
        );
    }

    private async seedTestForModule(moduleId: string): Promise<Test> {
        const existingTest = await manager.findOne(Test, {
            where: { moduleId },
            relations: ["questions"]
        });

        if (existingTest) {
            return existingTest;
        }

        // Create a new mock test
        const test = new Test();
        test.title = "Module Knowledge Assessment";
        test.timeLimit = 15; // 15 minutes
        test.allowedAttempts = 3;
        test.moduleId = moduleId;
        const savedTest = await manager.save(Test, test);

        // Add 3 mock questions
        const q1 = new Question();
        q1.text = "What is the primary role of a Sentinel in system monitoring?";
        q1.options = [
            { id: "1", text: "To encrypt communications between nodes", points: 0, isCorrect: false },
            { id: "2", text: "To actively scan, intercept, and block unauthorized traffic anomalies in real-time", points: 10, isCorrect: true },
            { id: "3", text: "To store transaction history records in cold storage logs", points: 0, isCorrect: false },
            { id: "4", text: "To deploy cloud servers on-demand automatically", points: 0, isCorrect: false }
        ];
        q1.testId = savedTest.id;

        const q2 = new Question();
        q2.text = "Which mechanism is best suited to guarantee payload integrity during webhook transfers?";
        q2.options = [
            { id: "1", text: "Standard CORS header policy restrictions", points: 0, isCorrect: false },
            { id: "2", text: "Cryptographic HMAC signatures matched against secret tokens", points: 10, isCorrect: true },
            { id: "3", text: "SSL certificate generation on every transaction", points: 0, isCorrect: false }
        ];
        q2.testId = savedTest.id;

        const q3 = new Question();
        q3.text = "How does the Paystack webhook callback report successful card authorization charges?";
        q3.options = [
            { id: "1", text: "Via a client-side alert popup response", points: 0, isCorrect: false },
            { id: "2", text: "By posting a charge.success event containing metadata details", points: 10, isCorrect: true },
            { id: "3", text: "By initiating an automated refund transaction", points: 0, isCorrect: false }
        ];
        q3.testId = savedTest.id;

        await manager.save(Question, [q1, q2, q3]);
        
        savedTest.questions = [q1, q2, q3];
        return savedTest;
    }

    async save(moduleEntity: ModuleEntity): Promise<ModuleEntity> {
        const savedModule = await manager.save(Module, this.toPersistence(moduleEntity));
        return this.toDomain(savedModule);
    }

    async findById(moduleId: string): Promise<ModuleEntity | null> {
        const moduleModel = await manager.findOne(Module, { 
            where: { id: moduleId },
            relations: ["course", "lessons", "lessons.resource", "test", "test.questions"] 
        });
        if (!moduleModel) return null;
        if (!moduleModel.test) {
            moduleModel.test = await this.seedTestForModule(moduleModel.id);
        }
        return this.toDomain(moduleModel);
    }

    async findByCourse(courseId: string): Promise<ModuleEntity[]> {
        const modules = await manager.find(Module, { 
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

    async delete(moduleId: string): Promise<BaseResponse> {
        try {
            const result = await manager.delete(Module, moduleId);
            if (result.affected === 0) return { success: false, message: "Module not found" };
            return { success: true, message: "Module deleted successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}
