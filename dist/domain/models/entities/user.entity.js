"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, email, password, socialChannel, socialChannelId, promptPasswordChange, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.socialChannel = socialChannel;
        this.socialChannelId = socialChannelId;
        this.promptPasswordChange = promptPasswordChange;
        this.role = role;
    }
}
exports.UserEntity = UserEntity;
