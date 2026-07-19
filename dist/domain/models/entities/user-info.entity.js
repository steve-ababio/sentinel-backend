"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoEntity = void 0;
class UserInfoEntity {
    constructor(userId, firstName, lastName, phoneNumber, company, profilePicture, id, email, isEmailVerified, role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.profilePicture = profilePicture;
        this.id = id;
        this.email = email;
        this.isEmailVerified = isEmailVerified;
        this.role = role;
    }
}
exports.UserInfoEntity = UserInfoEntity;
