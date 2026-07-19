import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddAllTables1780215665810 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
