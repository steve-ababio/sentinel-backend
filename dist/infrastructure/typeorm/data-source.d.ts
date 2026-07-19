import { DataSource } from 'typeorm';
export declare const AppDataSource: DataSource;
export declare const createPostgresConnection: () => Promise<DataSource>;
export declare const closeDbConnection: () => Promise<void>;
export declare const manager: import("typeorm").EntityManager;
