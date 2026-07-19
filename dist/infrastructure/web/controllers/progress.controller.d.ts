import { GetLastWatchedLessonPort } from "@ports/in/progress/get-last-watched-lesson.port";
import { UpdateProgressPort } from "@ports/in/progress/update-progress.port";
import { FindCourseProgressPort } from "@ports/in/progress/find-course-progress.port";
import { SaveProgressPort } from "@ports/in/progress/save-progress.port";
import { FindProgressByLessonPort } from "@ports/in/progress/find-progress-by-lesson.port";
export declare class ProgressController {
    private getLastWatchedLessonPort;
    private updateProgressPort;
    private findCourseProgressPort;
    private saveProgressPort;
    private findProgressByLessonPort;
    constructor(getLastWatchedLessonPort: GetLastWatchedLessonPort, updateProgressPort: UpdateProgressPort, findCourseProgressPort: FindCourseProgressPort, saveProgressPort: SaveProgressPort, findProgressByLessonPort: FindProgressByLessonPort);
    getLastWatchedLesson(ctx: any): Promise<void>;
    updateProgress(ctx: any): Promise<void>;
    findCourseProgress(ctx: any): Promise<void>;
    saveProgress(ctx: any): Promise<void>;
    findProgressByLesson(ctx: any): Promise<void>;
}
