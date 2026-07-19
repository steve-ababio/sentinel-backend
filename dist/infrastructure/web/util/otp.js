"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpCode = generateOtpCode;
function generateOtpCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
