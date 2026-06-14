import { AccessTokenPayload, RefreshTokenPayload, ResetTokenPayload } from '@common/global/types';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_VALIDITY = '1h';
const REFRESH_TOKEN_VALIDITY = '7d';
const RESET_TOKEN_VALIDITY = '30m';

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export const generateJwtToken = (
    userId: string,
    sessionId: string,
    options?: { userInfoId?: string }
  ): string => {
    const payload: AccessTokenPayload = {
      id: userId,
      sessionId,
      type: 'access',
      ...(options?.userInfoId && { userInfoId: options.userInfoId }),
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: ACCESS_TOKEN_VALIDITY,
    });
  };

  export const generateRefreshToken = (userId: string,sessionId: string): string => {
    const payload: RefreshTokenPayload = {
      id: userId,
      sessionId,
      type: 'refresh',
    };
  
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_VALIDITY,
    });
  };
  export const generateTokenPair = (userId: string,sessionId: string): TokenPair => {
    return {
      accessToken: generateJwtToken(userId, sessionId),
      refreshToken: generateRefreshToken(userId, sessionId),
    };
  };
export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;

    if (payload.type !== 'access') {
        throw new Error('Invalid token type');
    }

    return payload;
};
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const payload = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
      { ignoreExpiration: true }
    ) as RefreshTokenPayload;
  
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return payload;
  };

  export const generateResetToken = (userId: string): string => {
    const payload: ResetTokenPayload = {
      userId,
      type: 'reset',
    };
  
    return jwt.sign(payload, process.env.RESET_TOKEN_SECRET!, {
      expiresIn: RESET_TOKEN_VALIDITY,
    });
  };

  export const verifyResetToken = (token: string): string => {
    const payload = jwt.verify(
      token,
      process.env.RESET_TOKEN_SECRET!
    ) as ResetTokenPayload;
  
    if (payload.type !== 'reset') {
      throw new Error('Invalid token type');
    }
  
    return payload.userId;
  };