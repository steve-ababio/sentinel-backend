import { CreateLessonPort } from "@ports/in/lesson/create-lesson.port";
import { FindLessonsByModulePort } from "@ports/in/lesson/find-lessons-by-module.port";
import { CountLessonsByCoursePort } from "@ports/in/lesson/count-lessons-by-course.port";
import { FindPreviousLessonPort } from "@ports/in/lesson/find-previous-lesson.port";
import { FindLessonByIdPort } from "@ports/in/lesson/find-lesson-by-id.port";
import { DeleteLessonPort } from "@ports/in/lesson/delete-lesson.port";
import { FindNextLessonPort } from "@ports/in/lesson/find-next-lesson.port";
export declare class LessonController {
    private createLessonPort;
    private findLessonsByModulePort;
    private countLessonsByCoursePort;
    private findPreviousLessonPort;
    private findLessonByIdPort;
    private deleteLessonPort;
    private findNextLessonPort;
    constructor(createLessonPort: CreateLessonPort, findLessonsByModulePort: FindLessonsByModulePort, countLessonsByCoursePort: CountLessonsByCoursePort, findPreviousLessonPort: FindPreviousLessonPort, findLessonByIdPort: FindLessonByIdPort, deleteLessonPort: DeleteLessonPort, findNextLessonPort: FindNextLessonPort);
    createLesson(ctx: any): Promise<void>;
    findLessonsByModule(ctx: any): Promise<void>;
    countLessonsByCourse(ctx: any): Promise<void>;
    findPreviousLesson(ctx: any): Promise<void>;
    findLessonById(ctx: any): Promise<void>;
    deleteLesson(ctx: any): Promise<void>;
    findNextLesson(ctx: any): Promise<void>;
}
