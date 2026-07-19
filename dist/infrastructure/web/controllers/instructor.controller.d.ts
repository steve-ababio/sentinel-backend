import { CreateInstructorPort } from "@ports/in/instructor/create-instructor.port";
import { UpdateInstructorPort } from "@ports/in/instructor/update-instructor.port";
import { GetInstructorPort } from "@ports/in/instructor/get-instructor.port";
import { DeleteInstructorPort } from "@ports/in/instructor/delete-instructor.port";
import { ListInstructorsPort } from "@ports/in/instructor/list-instructors.port";
export declare class InstructorController {
    private createInstructorPort;
    private updateInstructorPort;
    private getInstructorPort;
    private deleteInstructorPort;
    private listInstructorsPort;
    constructor(createInstructorPort: CreateInstructorPort, updateInstructorPort: UpdateInstructorPort, getInstructorPort: GetInstructorPort, deleteInstructorPort: DeleteInstructorPort, listInstructorsPort: ListInstructorsPort);
    createInstructor(ctx: any): Promise<void>;
    updateInstructor(ctx: any): Promise<void>;
    getInstructor(ctx: any): Promise<void>;
    deleteInstructor(ctx: any): Promise<void>;
    list(ctx: any): Promise<void>;
}
