"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_info_use_case_1 = require("@domain/application/user/create-user-info.use-case");
const get_user_info_use_case_1 = require("@domain/application/user/get-user-info.use-case");
const update_user_info_use_case_1 = require("@domain/application/user/update-user-info.use-case");
const user_info_repository_1 = require("@infrastructure/typeorm/repository/user-info/user-info.repository");
const user_repository_1 = require("@infrastructure/typeorm/repository/user/user.repository");
const tsyringe_1 = require("tsyringe");
tsyringe_1.container.register("UserPersistencePort", {
    useClass: user_repository_1.UserRepository
});
tsyringe_1.container.register("UserInfoPersistencePort", {
    useClass: user_info_repository_1.UserInfoRepository
});
tsyringe_1.container.register("CreateUserInfoPort", {
    useClass: create_user_info_use_case_1.CreateUserInfoUseCase
});
tsyringe_1.container.register("UpdateUserInfoPort", {
    useClass: update_user_info_use_case_1.UpdateUserInfoUseCase
});
tsyringe_1.container.register("GetUserInfoPort", {
    useClass: get_user_info_use_case_1.GetUserInfoUseCase
});
const user_card_repository_adapter_1 = require("@infrastructure/typeorm/adapters/user-card.repository.adapter");
tsyringe_1.container.register("UserCardPersistencePort", {
    useClass: user_card_repository_adapter_1.UserCardRepositoryAdapter
});
