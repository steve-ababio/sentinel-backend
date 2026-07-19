"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardEntity = void 0;
class UserCardEntity {
    constructor(userId, cardToken, last4, brand, expMonth, expYear, isDefault, id) {
        this.userId = userId;
        this.cardToken = cardToken;
        this.last4 = last4;
        this.brand = brand;
        this.expMonth = expMonth;
        this.expYear = expYear;
        this.isDefault = isDefault;
        this.id = id;
    }
}
exports.UserCardEntity = UserCardEntity;
