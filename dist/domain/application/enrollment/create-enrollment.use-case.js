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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnrollmentUseCase = void 0;
const enum_1 = require("@common/auth/enum");
const enum_2 = require("@common/user/enum");
const route_error_1 = require("@infrastructure/web/util/route-error");
const status_codes_1 = require("@common/web/status-codes");
const tsyringe_1 = require("tsyringe");
let CreateEnrollmentUseCase = class CreateEnrollmentUseCase {
    constructor(enrollmentPersistencePort, contactPersistencePort) {
        this.enrollmentPersistencePort = enrollmentPersistencePort;
        this.contactPersistencePort = contactPersistencePort;
    }
    async createEnrollment(enrollment) {
        const contacts = await this.contactPersistencePort.findAllUserContacts(enrollment.userId);
        const emailContact = contacts?.find(c => c.identifierType === enum_1.IdentifierType.EMAIL);
        if (!emailContact || emailContact.status !== enum_2.ContactStatus.VERIFIED) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, "Email verification required before enrollment.");
        }
        return this.enrollmentPersistencePort.create(enrollment);
    }
};
exports.CreateEnrollmentUseCase = CreateEnrollmentUseCase;
exports.CreateEnrollmentUseCase = CreateEnrollmentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('EnrollmentPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('ContactPersistencePort')),
    __metadata("design:paramtypes", [Object, Object])
], CreateEnrollmentUseCase);
