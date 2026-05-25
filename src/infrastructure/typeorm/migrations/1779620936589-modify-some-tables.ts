import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779620936589 implements MigrationInterface {
    name = 'ModifySomeTables1779620936589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e97ecbf11356b5173ce7fb0b06"`);
        await queryRunner.query(`ALTER TABLE "enrollment" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_fc17c7e94154a17e767b7674f1" ON "enrollment" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_fc17c7e94154a17e767b7674f12" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_fc17c7e94154a17e767b7674f12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc17c7e94154a17e767b7674f1"`);
        await queryRunner.query(`ALTER TABLE "enrollment" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`CREATE INDEX "IDX_e97ecbf11356b5173ce7fb0b06" ON "enrollment" ("userId") `);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
