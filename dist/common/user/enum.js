"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpValidationType = exports.PaymentMode = exports.ContactStatus = exports.IdentifierType = exports.UniqueCurrencies = exports.Country = exports.Gender = void 0;
const countries_list_1 = require("countries-list");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
exports.Country = Object.keys(countries_list_1.countries).reduce((acc, code) => {
    acc[code] = code;
    return acc;
}, {});
const Currencies = Object.keys(countries_list_1.countries).reduce((acc, code) => {
    const currencies = countries_list_1.countries[code].currency;
    acc.push(...currencies);
    return acc;
}, []);
exports.UniqueCurrencies = [...new Set(Currencies)];
var IdentifierType;
(function (IdentifierType) {
    IdentifierType["EMAIL"] = "EMAIL";
    IdentifierType["PHONE"] = "PHONE";
})(IdentifierType || (exports.IdentifierType = IdentifierType = {}));
var ContactStatus;
(function (ContactStatus) {
    ContactStatus["VERIFIED"] = "VERIFIED";
    ContactStatus["PENDING"] = "PENDING";
    ContactStatus["NOT_STARTED"] = "NOT_STARTED";
})(ContactStatus || (exports.ContactStatus = ContactStatus = {}));
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["MOBILE_MONEY"] = "MOBILE_MONEY";
    PaymentMode["BANK"] = "BANK";
    PaymentMode["CARD"] = "CARD";
})(PaymentMode || (exports.PaymentMode = PaymentMode = {}));
var OtpValidationType;
(function (OtpValidationType) {
    OtpValidationType["CONTACT_VALIDATION"] = "CONTACT_VALIDATION";
    OtpValidationType["PASSWORD_RESET"] = "PASSWORD_RESET";
    OtpValidationType["STUDENT_EMAIL_VALIDATION"] = "STUDENT_EMAIL_VALIDATION";
})(OtpValidationType || (exports.OtpValidationType = OtpValidationType = {}));
