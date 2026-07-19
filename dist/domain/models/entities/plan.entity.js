"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanEntity = void 0;
class PlanEntity {
    constructor(name, price, currency, interval, trialDays) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.interval = interval;
        this.trialDays = trialDays;
    }
}
exports.PlanEntity = PlanEntity;
