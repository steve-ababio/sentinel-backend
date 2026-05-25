import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779624986256 implements MigrationInterface {
    name = 'ModifySomeTables1779624986256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "FK_47d4039ae15a387ef27eccf3825"`);
        await queryRunner.query(`ALTER TABLE "module" RENAME COLUMN "courseId" TO "course_id"`);
        await queryRunner.query(`ALTER TABLE "module" ADD CONSTRAINT "FK_915ad25970ccbfeb9e16e82c181" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "FK_915ad25970ccbfeb9e16e82c181"`);
        await queryRunner.query(`ALTER TABLE "module" RENAME COLUMN "course_id" TO "courseId"`);
        await queryRunner.query(`ALTER TABLE "module" ADD CONSTRAINT "FK_47d4039ae15a387ef27eccf3825" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
