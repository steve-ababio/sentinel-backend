export interface CountLessonsByCoursePort {
    countLessonsByCourse(courseId: string): Promise<number>;
}
