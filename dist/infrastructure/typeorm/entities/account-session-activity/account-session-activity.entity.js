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
exports.AccountSessionActivity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const enum_1 = require("@common/auth/enum");
const base_entity_1 = require("../base/base.entity");
let AccountSessionActivity = class AccountSessionActivity extends base_entity_1.BaseEntity {
};
exports.AccountSessionActivity = AccountSessionActivity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], AccountSessionActivity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccountSessionActivity.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccountSessionActivity.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.AccountSessionStatus,
        default: enum_1.AccountSessionStatus.ACTIVE
    }),
    __metadata("design:type", String)
], AccountSessionActivity.prototype, "status", void 0);
exports.AccountSessionActivity = AccountSessionActivity = __decorate([
    (0, typeorm_1.Entity)('account_session_activity')
], AccountSessionActivity);
