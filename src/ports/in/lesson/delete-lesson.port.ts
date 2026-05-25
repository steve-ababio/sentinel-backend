export interface DeleteLessonPort {
    deleteLesson(lessonId: string): Promise<void>;
}
