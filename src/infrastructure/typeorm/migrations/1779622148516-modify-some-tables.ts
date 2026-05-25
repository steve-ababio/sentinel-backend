import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779622148516 implements MigrationInterface {
    name = 'ModifySomeTables1779622148516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP CONSTRAINT "FK_df6c728a3df388df34e03d08088"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26319ff74c8120c7b08842013f"`);
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "lessonId" TO "lesson_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_aab3892b2409baa277bdf36260" ON "progress" ("userId", "lesson_id") `);
        await queryRunner.query(`ALTER TABLE "progress" ADD CONSTRAINT "FK_ef62be61a6c4f69d0570bb5cc35" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP CONSTRAINT "FK_ef62be61a6c4f69d0570bb5cc35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aab3892b2409baa277bdf36260"`);
        await queryRunner.query(`ALTER TABLE "progress" RENAME COLUMN "lesson_id" TO "lessonId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_26319ff74c8120c7b08842013f" ON "progress" ("lessonId", "userId") `);
        await queryRunner.query(`ALTER TABLE "progress" ADD CONSTRAINT "FK_df6c728a3df388df34e03d08088" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
