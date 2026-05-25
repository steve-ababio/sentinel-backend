import { inject, injectable } from "tsyringe";
import { GetLeagueTablePort, LeagueTableEntry } from "@ports/in/course/get-league-table.port";
import { EnrollmentPersistencePort } from "@ports/out/persistence/enrollment.persistence";

@injectable()
export class GetLeagueTableUseCase implements GetLeagueTablePort {
    constructor(
        @inject("EnrollmentPersistencePort")
        private enrollmentPersistencePort: EnrollmentPersistencePort
    ) {}

    async getLeagueTable(courseId: string): Promise<LeagueTableEntry[]> {
        return this.enrollmentPersistencePort.getLeagueTable(courseId);
    }
}
