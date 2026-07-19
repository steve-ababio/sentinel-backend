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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const module_entity_1 = require("../module/module.entity");
const enrollment_entity_1 = require("../enrollment/enrollment.entity");
const types_1 = require("@common/global/types");
const progress_entity_1 = require("../progress/progress.entity");
const instructor_entity_1 = require("../instructor/instructor.entity");
let Course = class Course extends base_entity_1.BaseEntity {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "skillsGained", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "expectedExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPopular", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Sentinel Prime K" }),
    __metadata("design:type", String)
], Course.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: types_1.PricingModel }),
    __metadata("design:type", String)
], Course.prototype, "pricingModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "enrolledCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: types_1.CourseLevel
    }),
    __metadata("design:type", String)
], Course.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Course.prototype, "approvalRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => module_entity_1.Module, (m) => m.course),
    __metadata("design:type", Array)
], Course.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (e) => e.course),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => progress_entity_1.Progress, (p) => p.lesson),
    __metadata("design:type", Array)
], Course.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "instructor_id" }),
    __metadata("design:type", instructor_entity_1.Instructor)
], Course.prototype, "instructor", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)('course')
], Course);
