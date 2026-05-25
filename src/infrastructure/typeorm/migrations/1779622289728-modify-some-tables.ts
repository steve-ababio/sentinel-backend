import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779622289728 implements MigrationInterface {
    name = 'ModifySomeTables1779622289728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_16e7969589c0b789d9868782259"`);
        await queryRunner.query(`ALTER TABLE "progress" DROP CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0366c96237f98ea1c8ba6e1ec3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aab3892b2409baa277bdf36260"`);
        await queryRunner.query(`ALTER TABLE "lessons" RENAME COLUMN "moduleId" TO "module_id"`);
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_ddcaca3a9db9d77105d51c02c2" ON "progress" ("user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9e287419e37b04d545078d9c9b" ON "progress" ("user_id", "lesson_id") `);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_35fb2307535d90a6ed290af1f4a" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress" ADD CONSTRAINT "FK_ddcaca3a9db9d77105d51c02c24" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP CONSTRAINT "FK_ddcaca3a9db9d77105d51c02c24"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_35fb2307535d90a6ed290af1f4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e287419e37b04d545078d9c9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ddcaca3a9db9d77105d51c02c2"`);
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "lessons" RENAME COLUMN "module_id" TO "moduleId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_aab3892b2409baa277bdf36260" ON "progress" ("lesson_id", "userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0366c96237f98ea1c8ba6e1ec3" ON "progress" ("userId") `);
        await queryRunner.query(`ALTER TABLE "progress" ADD CONSTRAINT "FK_0366c96237f98ea1c8ba6e1ec35" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_16e7969589c0b789d9868782259" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
