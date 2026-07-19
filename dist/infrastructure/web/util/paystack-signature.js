"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaystackSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifyPaystackSignature = (rawBody, signature, secret) => {
    const hash = crypto_1.default.createHmac('sha512', secret).update(rawBody).digest('hex');
    return hash === signature;
};
exports.verifyPaystackSignature = verifyPaystackSignature;
