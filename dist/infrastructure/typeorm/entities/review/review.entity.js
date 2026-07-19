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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const types_1 = require("@common/global/types");
const user_info_entity_1 = require("../user-info/user-info.entity");
let Review = class Review extends base_entity_1.BaseEntity {
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => user_info_entity_1.UserInfo, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "reviewer_id" }),
    __metadata("design:type", user_info_entity_1.UserInfo)
], Review.prototype, "reviewer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "entity_type",
        type: "enum",
        enum: types_1.EntityType,
    }),
    __metadata("design:type", String)
], Review.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "entity_id",
        type: "varchar",
        length: 255
    }),
    __metadata("design:type", String)
], Review.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)('review')
], Review);
