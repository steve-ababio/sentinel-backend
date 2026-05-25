import { CreateUserInfoUseCase } from "@domain/application/user/create-user-info.use-case";
import { GetUserInfoUseCase } from "@domain/application/user/get-user-info.use-case";
import { UpdateUserInfoUseCase } from "@domain/application/user/update-user-info.use-case";
import { UserInfoRepository } from "@infrastructure/typeorm/repository/user-info/user-info.repository";
import { UserRepository } from "@infrastructure/typeorm/repository/user/user.repository";
import { CreateUserInfoPort } from "@ports/in/user/create-user-info.port";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";
import { UpdateUserInfoPort } from "@ports/in/user/update-user-info.port";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { container } from "tsyringe";

container.register<UserPersistencePort>("UserPersistencePort", {
    useClass: UserRepository
});

container.register<UserInfoPersistencePort>("UserInfoPersistencePort", {
    useClass: UserInfoRepository
});

container.register<CreateUserInfoPort>("CreateUserInfoPort", {
    useClass: CreateUserInfoUseCase
});

container.register<UpdateUserInfoPort>("UpdateUserInfoPort", {
    useClass: UpdateUserInfoUseCase
});

container.register<GetUserInfoPort>("GetUserInfoPort", {
    useClass: GetUserInfoUseCase
});

import { UserCardRepositoryAdapter } from "@infrastructure/typeorm/adapters/user-card.repository.adapter";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";

container.register<UserCardPersistencePort>("UserCardPersistencePort", {
    useClass: UserCardRepositoryAdapter
});