"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSessionActivityEntity = void 0;
class AccountSessionActivityEntity {
    constructor(userId, deviceType, os, status, id) {
        this.userId = userId;
        this.deviceType = deviceType;
        this.os = os;
        this.status = status;
        this.id = id;
    }
}
exports.AccountSessionActivityEntity = AccountSessionActivityEntity;
