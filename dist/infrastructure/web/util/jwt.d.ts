import { AccessTokenPayload, RefreshTokenPayload } from '@common/global/types';
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export declare const generateJwtToken: (userId: string, sessionId: string, options?: {
    userInfoId?: string;
}) => string;
export declare const generateRefreshToken: (userId: string, sessionId: string) => string;
export declare const generateTokenPair: (userId: string, sessionId: string) => TokenPair;
export declare const verifyAccessToken: (token: string) => AccessTokenPayload;
export declare const verifyRefreshToken: (token: string) => RefreshTokenPayload;
export declare const generateResetToken: (userId: string) => string;
export declare const verifyResetToken: (token: string) => string;
