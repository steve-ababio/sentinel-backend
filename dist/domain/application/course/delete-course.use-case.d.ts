import { BaseResponse } from "@common/global/types";
import { DeleteCoursePort } from "@ports/in/course/delete-course.port";
import { CoursePersistencePort } from "@ports/out/persistence/course.persistence";
export declare class DeleteCourseUseCase implements DeleteCoursePort {
    private readonly coursePersistencePort;
    constructor(coursePersistencePort: CoursePersistencePort);
    deleteCourse(courseId: string): Promise<BaseResponse>;
}
