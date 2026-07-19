export declare class GoogleAuthStrategy {
    private oauthClient;
    constructor();
    verifyToken(idToken: string): Promise<{
        email: string | undefined;
        id: string;
        displayName: string | undefined;
    }>;
}
