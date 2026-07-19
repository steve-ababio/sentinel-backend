import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { FindEnrollmentByIdsPort } from "@ports/in/enrollment/find-enrollment-by-ids.port";
import { FindAllEnrollmentsByUserPort } from "@ports/in/enrollment/find-all-enrollments-by-user.port";
import { CompleteEnrollmentPort } from "@ports/in/enrollment/complete-enrollment.port";
export declare class EnrollmentController {
    private createEnrollmentPort;
    private findEnrollmentByIdsPort;
    private findAllEnrollmentsByUserPort;
    private completeEnrollmentPort;
    constructor(createEnrollmentPort: CreateEnrollmentPort, findEnrollmentByIdsPort: FindEnrollmentByIdsPort, findAllEnrollmentsByUserPort: FindAllEnrollmentsByUserPort, completeEnrollmentPort: CompleteEnrollmentPort);
    createEnrollment(ctx: any): Promise<void>;
    findEnrollmentByIds(ctx: any): Promise<void>;
    findAllEnrollmentsByUser(ctx: any): Promise<void>;
    completeEnrollment(ctx: any): Promise<void>;
}
