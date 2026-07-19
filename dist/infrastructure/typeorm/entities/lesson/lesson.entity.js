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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const module_entity_1 = require("../module/module.entity");
const file_entity_1 = require("../file/file.entity");
const progress_entity_1 = require("../progress/progress.entity");
let Lesson = class Lesson extends base_entity_1.BaseEntity {
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Lesson.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => module_entity_1.Module, (m) => m.lessons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "module_id" }),
    __metadata("design:type", module_entity_1.Module)
], Lesson.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => progress_entity_1.Progress, (p) => p.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => file_entity_1.Resource, (resource) => resource.lesson, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Object)
], Lesson.prototype, "resource", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)('lessons')
], Lesson);
