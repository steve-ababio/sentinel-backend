import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779622767565 implements MigrationInterface {
    name = 'ModifySomeTables1779622767565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "lastPosition" TO "last_position"`);
        await queryRunner.query(`ALTER TABLE "progress" DROP COLUMN "last_position"`);
        await queryRunner.query(`ALTER TABLE "progress" ADD "last_position" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP COLUMN "last_position"`);
        await queryRunner.query(`ALTER TABLE "progress" ADD "last_position" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "last_position" TO "lastPosition"`);
    }

}
