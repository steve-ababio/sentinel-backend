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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const enum_1 = require("@common/auth/enum");
const types_1 = require("@common/global/types");
let User = class User extends base_entity_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'identifier', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], User.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'social_channel',
        type: 'enum',
        enum: enum_1.SocialChannel,
        default: enum_1.SocialChannel.NONE,
    }),
    __metadata("design:type", String)
], User.prototype, "socialChannel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'account_auth_status',
        type: 'enum',
        enum: enum_1.AccountAuthStatus,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "accountAuthStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'social_channel_id', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "socialChannelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'enum', enum: types_1.UserRole, default: types_1.UserRole.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'password_reset_date',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "passwordResetDate", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' }),
    (0, typeorm_1.Unique)(['identifier'])
], User);
