import { join } from 'path';
import { DataSource } from 'typeorm'
const DATABASE_URL = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: true,
    logging: false,
    subscribers: [],

});

export const createPostgresConnection = (): Promise<DataSource> => {
    if (AppDataSource.isInitialized) {
      return Promise.resolve(AppDataSource)
    }
    return AppDataSource.initialize()
  }
  
  export const closeDbConnection = (): Promise<void> => {
    if (AppDataSource.isInitialized) {
      return AppDataSource.destroy();
    }
    return Promise.resolve();
  }
  
  export const manager = AppDataSource.manager
  