"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manager = exports.closeDbConnection = exports.createPostgresConnection = exports.AppDataSource = void 0;
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const DATABASE_URL = process.env.DATABASE_URL;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [(0, path_1.join)(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: true,
    logging: false,
    subscribers: [],
});
const createPostgresConnection = () => {
    if (exports.AppDataSource.isInitialized) {
        return Promise.resolve(exports.AppDataSource);
    }
    return exports.AppDataSource.initialize();
};
exports.createPostgresConnection = createPostgresConnection;
const closeDbConnection = () => {
    if (exports.AppDataSource.isInitialized) {
        return exports.AppDataSource.destroy();
    }
    return Promise.resolve();
};
exports.closeDbConnection = closeDbConnection;
exports.manager = exports.AppDataSource.manager;
