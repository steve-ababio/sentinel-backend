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
exports.Progress = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("../lesson/lesson.entity");
const user_entity_1 = require("../user/user.entity");
const base_entity_1 = require("../base/base.entity");
let Progress = class Progress extends base_entity_1.BaseEntity {
};
exports.Progress = Progress;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Progress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.progress),
    (0, typeorm_1.JoinColumn)({ name: "lesson_id" }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Progress.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Progress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_position', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Progress.prototype, "lastPosition", void 0);
exports.Progress = Progress = __decorate([
    (0, typeorm_1.Index)(['user', 'lesson'], { unique: true }),
    (0, typeorm_1.Entity)('progress')
], Progress);
