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
exports.Instructor = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
let Instructor = class Instructor extends base_entity_1.BaseEntity {
};
exports.Instructor = Instructor;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Instructor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Instructor.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Instructor.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_picture', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Instructor.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Instructor.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'specialization', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Instructor.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_number', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Instructor.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bio', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Instructor.prototype, "bio", void 0);
exports.Instructor = Instructor = __decorate([
    (0, typeorm_1.Entity)('instructor')
], Instructor);
