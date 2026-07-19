export interface LeagueTableEntry {
    rank: number;
    name: string;
    handle: string;
    company: string;
    course: string;
    points: number;
    date: string;
    status: string;
    profilePicture?: string | null;
}
export interface GetLeagueTablePort {
    getLeagueTable(courseId: string): Promise<LeagueTableEntry[]>;
}
