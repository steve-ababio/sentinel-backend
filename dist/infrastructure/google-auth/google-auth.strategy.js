"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthStrategy = void 0;
const logger_1 = require("@infrastructure/web/util/logger");
const google_auth_library_1 = require("google-auth-library");
const tsyringe_1 = require("tsyringe");
let GoogleAuthStrategy = class GoogleAuthStrategy {
    constructor() {
        this.oauthClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async verifyToken(idToken) {
        try {
            const ticket = await this.oauthClient.verifyIdToken({
                idToken
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new Error('Invalid token payload');
            }
            const { email, sub: id, name: displayName } = payload;
            return { email, id, displayName };
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error('Invalid Google ID token');
        }
    }
};
exports.GoogleAuthStrategy = GoogleAuthStrategy;
exports.GoogleAuthStrategy = GoogleAuthStrategy = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], GoogleAuthStrategy);
