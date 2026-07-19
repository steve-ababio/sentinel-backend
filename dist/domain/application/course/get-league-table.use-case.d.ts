import { GetLeagueTablePort, LeagueTableEntry } from "@ports/in/course/get-league-table.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";
export declare class GetLeagueTableUseCase implements GetLeagueTablePort {
    private enrollmentPersistencePort;
    constructor(enrollmentPersistencePort: EnrollmentPersistencePort);
    getLeagueTable(courseId: string): Promise<LeagueTableEntry[]>;
}
