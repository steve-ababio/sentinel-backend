import { CreateCoursePort } from "@ports/in/course/create-course.port";
import { FindAllCoursesPort } from "@ports/in/course/find-all-courses.port";
import { FindCourseByIdPort } from "@ports/in/course/find-course-by-id.port";
import { UpdateCoursePort } from "@ports/in/course/update-course.port";
import { DeleteCoursePort } from "@ports/in/course/delete-course.port";
import { GetLeagueTablePort } from "@ports/in/course/get-league-table.port";
export declare class CourseController {
    private createCoursePort;
    private findAllCoursesPort;
    private findCourseByIdPort;
    private updateCoursePort;
    private deleteCoursePort;
    private getLeagueTablePort;
    constructor(createCoursePort: CreateCoursePort, findAllCoursesPort: FindAllCoursesPort, findCourseByIdPort: FindCourseByIdPort, updateCoursePort: UpdateCoursePort, deleteCoursePort: DeleteCoursePort, getLeagueTablePort: GetLeagueTablePort);
    createCourse(ctx: any): Promise<void>;
    findAllCourses(ctx: any): Promise<void>;
    findCourseById(ctx: any): Promise<void>;
    updateCourse(ctx: any): Promise<void>;
    deleteCourse(ctx: any): Promise<void>;
    getLeagueTable(ctx: any): Promise<void>;
}
