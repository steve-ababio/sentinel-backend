"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpStatus = exports.AccountSessionStatus = exports.IdentifierType = exports.SocialChannel = exports.AccountAuthStatus = void 0;
var AccountAuthStatus;
(function (AccountAuthStatus) {
    AccountAuthStatus["PASSWORD_RESET"] = "PASSWORD_RESET";
    AccountAuthStatus["OK"] = "OK";
})(AccountAuthStatus || (exports.AccountAuthStatus = AccountAuthStatus = {}));
var SocialChannel;
(function (SocialChannel) {
    SocialChannel["GOOGLE"] = "GOOGLE";
    SocialChannel["APPLE"] = "APPLE";
    SocialChannel["NONE"] = "NONE";
})(SocialChannel || (exports.SocialChannel = SocialChannel = {}));
var IdentifierType;
(function (IdentifierType) {
    IdentifierType["EMAIL"] = "EMAIL";
    IdentifierType["PHONE"] = "PHONE";
})(IdentifierType || (exports.IdentifierType = IdentifierType = {}));
var AccountSessionStatus;
(function (AccountSessionStatus) {
    AccountSessionStatus["ACTIVE"] = "ACTIVE";
    AccountSessionStatus["INACTIVE"] = "INACTIVE";
    AccountSessionStatus["EXPIRED"] = "EXPIRED";
})(AccountSessionStatus || (exports.AccountSessionStatus = AccountSessionStatus = {}));
var OtpStatus;
(function (OtpStatus) {
    OtpStatus["ACTIVE"] = "ACTIVE";
    OtpStatus["USED"] = "USED";
    OtpStatus["EXPIRED"] = "EXPIRED";
})(OtpStatus || (exports.OtpStatus = OtpStatus = {}));
