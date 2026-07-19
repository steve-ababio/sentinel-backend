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
exports.Module = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const course_entity_1 = require("../course/course.entity");
const lesson_entity_1 = require("../lesson/lesson.entity");
const test_entity_1 = require("../test/test.entity");
let Module = class Module extends base_entity_1.BaseEntity {
};
exports.Module = Module;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Module.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Module.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Module.prototype, "estimatedTime", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Module.prototype, "moduleDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (c) => c.modules, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", course_entity_1.Course)
], Module.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (l) => l.module),
    __metadata("design:type", Array)
], Module.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => test_entity_1.Test, (t) => t.module, { nullable: true, cascade: true }),
    __metadata("design:type", Object)
], Module.prototype, "test", void 0);
exports.Module = Module = __decorate([
    (0, typeorm_1.Entity)('module')
], Module);
