export interface GoogleAuthPort {
    authenticate(idToken: string, userAgent: any): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
}
