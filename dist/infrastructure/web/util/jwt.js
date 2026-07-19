"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetToken = exports.generateResetToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokenPair = exports.generateRefreshToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_VALIDITY = '1h';
const REFRESH_TOKEN_VALIDITY = '7d';
const RESET_TOKEN_VALIDITY = '30m';
const generateJwtToken = (userId, sessionId, options) => {
    const payload = {
        id: userId,
        sessionId,
        type: 'access',
        ...(options?.userInfoId && { userInfoId: options.userInfoId }),
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_VALIDITY,
    });
};
exports.generateJwtToken = generateJwtToken;
const generateRefreshToken = (userId, sessionId) => {
    const payload = {
        id: userId,
        sessionId,
        type: 'refresh',
    };
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_VALIDITY,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateTokenPair = (userId, sessionId) => {
    return {
        accessToken: (0, exports.generateJwtToken)(userId, sessionId),
        refreshToken: (0, exports.generateRefreshToken)(userId, sessionId),
    };
};
exports.generateTokenPair = generateTokenPair;
const verifyAccessToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (payload.type !== 'access') {
        throw new Error('Invalid token type');
    }
    return payload;
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, { ignoreExpiration: true });
    if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
    }
    return payload;
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateResetToken = (userId) => {
    const payload = {
        userId,
        type: 'reset',
    };
    return jsonwebtoken_1.default.sign(payload, process.env.RESET_TOKEN_SECRET, {
        expiresIn: RESET_TOKEN_VALIDITY,
    });
};
exports.generateResetToken = generateResetToken;
const verifyResetToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.RESET_TOKEN_SECRET);
    if (payload.type !== 'reset') {
        throw new Error('Invalid token type');
    }
    return payload.userId;
};
exports.verifyResetToken = verifyResetToken;
