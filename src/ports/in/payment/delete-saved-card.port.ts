export interface DeleteSavedCardPort {
    deleteSavedCard(id: string, userId: string): Promise<void>;
}
