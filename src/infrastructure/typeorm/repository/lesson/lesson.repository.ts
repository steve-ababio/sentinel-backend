import { LessonEntity } from "@domain/models/entities/lesson.entity";
import { LessonPersistencePort } from "@ports/out/persistence/lesson.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Lesson } from "@infrastructure/typeorm/entities/lesson/lesson.entity";
import { Module } from "@infrastructure/typeorm/entities/module/module.entity";
import { injectable } from "tsyringe";
import { Resource } from "@infrastructure/typeorm/entities/file/file.entity";

@injectable()
export class LessonRepository implements LessonPersistencePort {

    private toPersistence(lessonEntity: LessonEntity): Lesson {
        const lessonModel = new Lesson();
        if (lessonEntity.id) lessonModel.id = lessonEntity.id;
        lessonModel.title = lessonEntity.title;
        lessonModel.videoUrl = lessonEntity.videoUrl;
        lessonModel.notes = lessonEntity.notes || "";
        lessonModel.order = lessonEntity.order;
        lessonModel.description = lessonEntity.description;
        lessonModel.duration = lessonEntity.duration;

        if (lessonEntity.moduleId) {
            const moduleModel = new Module();
            moduleModel.id = lessonEntity.moduleId;
            lessonModel.module = moduleModel;
        }
        return lessonModel;
    }

    private toDomain(lessonModel: Lesson): LessonEntity {
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

    async findByModule(moduleId: string): Promise<LessonEntity[]> {
        const lessons = await manager.find(Lesson, {
            where: { module: { id: moduleId } },
            relations: ["module"],
            order: { order: "ASC" }
        });
        return lessons.map(l => this.toDomain(l));
    }

    async findById(lessonId: string): Promise<LessonEntity | null> {
        const lesson = await manager.findOne(Lesson, {
            where: { id: lessonId },
            relations: ["module"]
        });
        if (!lesson) return null;
        return this.toDomain(lesson);
    }

    async findNextLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null> {
        // const nextLesson = await manager.findOne(Lesson, {
        //     where: { 
        //         module: { course: { id: courseId } }
        //     },
        //     relations: ["module", "module.course"],
        //     order: { order: "ASC" }
        // });

        // We find the first lesson strictly greater in order, ignoring module boundary for simple approach
        const query = manager.getRepository(Lesson).createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.module", "module")
            .where("module.courseId = :courseId", { courseId })
            .andWhere("lesson.order > :currentLessonOrder", { currentLessonOrder })
            .orderBy("lesson.order", "ASC");

        const lesson = await query.getOne();
        if (!lesson) return null;
        return this.toDomain(lesson);
    }

    async findPreviousLesson(courseId: string, currentLessonOrder: number): Promise<LessonEntity | null> {
        const query = manager.getRepository(Lesson).createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.module", "module")
            .where("module.courseId = :courseId", { courseId })
            .andWhere("lesson.order < :currentLessonOrder", { currentLessonOrder })
            .orderBy("lesson.order", "DESC");

        const lesson = await query.getOne();
        if (!lesson) return null;
        return this.toDomain(lesson);
    }

    async countByCourse(courseId: string): Promise<number> {
        return manager.count(Lesson, {
            where: { module: { course: { id: courseId } } }
        });
    }

    async create(lessonEntity: LessonEntity): Promise<LessonEntity> {
        const savedLesson = await manager.save(Lesson, this.toPersistence(lessonEntity));
        return this.toDomain(savedLesson);
    }

    async delete(lessonId: string): Promise<void> {
        await manager.delete(Lesson, lessonId);
    }
}
