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
exports.Test = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const module_entity_1 = require("../module/module.entity");
const question_entity_1 = require("../question/question.entity");
const test_submission_entity_1 = require("./test-submission.entity");
let Test = class Test extends base_entity_1.BaseEntity {
};
exports.Test = Test;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Test.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_limit', type: 'int', default: 30 }),
    __metadata("design:type", Number)
], Test.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allowed_attempts', type: 'int', default: 3 }),
    __metadata("design:type", Number)
], Test.prototype, "allowedAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'module_id' }),
    __metadata("design:type", String)
], Test.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => module_entity_1.Module, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'module_id' }),
    __metadata("design:type", module_entity_1.Module)
], Test.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (q) => q.test, { cascade: true }),
    __metadata("design:type", Array)
], Test.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => test_submission_entity_1.TestSubmission, (s) => s.test, { cascade: true }),
    __metadata("design:type", Array)
], Test.prototype, "submissions", void 0);
exports.Test = Test = __decorate([
    (0, typeorm_1.Entity)('tests')
], Test);
