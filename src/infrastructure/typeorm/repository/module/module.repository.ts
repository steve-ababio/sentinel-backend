import { BaseResponse } from "@common/global/types";
import { ModuleEntity } from "@domain/models/entities/module.entity";
import { ModulePersistencePort } from "@ports/out/persistence/module.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Module } from "@infrastructure/typeorm/entities/module/module.entity";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
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
            moduleId: moduleModel.id
        } as any)) : [];

        return new ModuleEntity(
            moduleModel.title,
            moduleModel.order,
            lessons,
            moduleModel.estimatedTime,
            moduleModel.moduleDetails,
            moduleModel.course?.id,
            moduleModel.id
        );
    }

    async save(moduleEntity: ModuleEntity): Promise<ModuleEntity> {
        const savedModule = await manager.save(Module, this.toPersistence(moduleEntity));
        return this.toDomain(savedModule);
    }

    async findById(moduleId: string): Promise<ModuleEntity | null> {
        const moduleModel = await manager.findOne(Module, { 
            where: { id: moduleId },
            relations: ["course", "lessons"] 
        });
        if (!moduleModel) return null;
        return this.toDomain(moduleModel);
    }

    async findByCourse(courseId: string): Promise<ModuleEntity[]> {
        const modules = await manager.find(Module, { 
            where: { course: { id: courseId } },
            relations: ["course", "lessons"],
            order: { order: "ASC" }
        });
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
