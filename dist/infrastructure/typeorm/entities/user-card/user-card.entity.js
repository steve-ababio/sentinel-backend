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
exports.UserCard = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const base_entity_1 = require("../base/base.entity");
let UserCard = class UserCard extends base_entity_1.BaseEntity {
};
exports.UserCard = UserCard;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'card_token',
        type: 'varchar',
        unique: true
    }),
    __metadata("design:type", String)
], UserCard.prototype, "cardToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'last4',
        type: 'varchar',
        length: 4
    }),
    __metadata("design:type", String)
], UserCard.prototype, "last4", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'brand',
        type: 'varchar'
    }),
    __metadata("design:type", String)
], UserCard.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'exp_month',
        type: 'int'
    }),
    __metadata("design:type", Number)
], UserCard.prototype, "expMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'exp_year',
        type: 'int'
    }),
    __metadata("design:type", Number)
], UserCard.prototype, "expYear", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "is_default",
        default: false
    }),
    __metadata("design:type", Boolean)
], UserCard.prototype, "isDefault", void 0);
exports.UserCard = UserCard = __decorate([
    (0, typeorm_1.Entity)('user-card')
], UserCard);
