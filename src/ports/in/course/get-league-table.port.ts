export interface LeagueTableEntry {
    rank: number;
    name: string;
    handle: string;
    company: string;
    course: string;
    points: number;
    date: string;
    status: string;
}

export interface GetLeagueTablePort {
    getLeagueTable(courseId: string): Promise<LeagueTableEntry[]>;
}
