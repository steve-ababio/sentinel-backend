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
exports.UserInfo = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const base_entity_1 = require("../base/base.entity");
let UserInfo = class UserInfo extends base_entity_1.BaseEntity {
};
exports.UserInfo = UserInfo;
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserInfo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], UserInfo.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], UserInfo.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'company',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_number',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_picture', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], UserInfo.prototype, "profilePicture", void 0);
exports.UserInfo = UserInfo = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_info' })
], UserInfo);
