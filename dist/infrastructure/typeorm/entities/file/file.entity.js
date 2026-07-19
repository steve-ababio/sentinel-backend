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
exports.Resource = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const types_1 = require("@common/global/types");
const lesson_entity_1 = require("../lesson/lesson.entity");
let Resource = class Resource extends base_entity_1.BaseEntity {
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.Column)({
        name: 'filename',
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Resource.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'enum',
        enum: types_1.FileType,
    }),
    __metadata("design:type", String)
], Resource.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'url',
        type: 'text',
    }),
    __metadata("design:type", String)
], Resource.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'mime_type',
        type: "enum",
        enum: types_1.FileMimeType,
        default: types_1.FileMimeType.IMAGE_JPEG
    }),
    __metadata("design:type", Object)
], Resource.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'readonly',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Resource.prototype, "readonly", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.resource, { nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "lesson", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)({ name: 'resource' })
], Resource);
