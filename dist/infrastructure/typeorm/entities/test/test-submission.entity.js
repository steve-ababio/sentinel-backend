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
exports.TestSubmission = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const user_entity_1 = require("../user/user.entity");
const test_entity_1 = require("./test.entity");
let TestSubmission = class TestSubmission extends base_entity_1.BaseEntity {
};
exports.TestSubmission = TestSubmission;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], TestSubmission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], TestSubmission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => test_entity_1.Test, (t) => t.submissions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'test_id' }),
    __metadata("design:type", test_entity_1.Test)
], TestSubmission.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'test_id' }),
    __metadata("design:type", String)
], TestSubmission.prototype, "testId", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], TestSubmission.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: {} }),
    __metadata("design:type", Object)
], TestSubmission.prototype, "answers", void 0);
exports.TestSubmission = TestSubmission = __decorate([
    (0, typeorm_1.Entity)('test_submissions')
], TestSubmission);
