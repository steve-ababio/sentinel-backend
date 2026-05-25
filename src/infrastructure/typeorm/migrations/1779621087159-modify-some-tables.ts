import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779621087159 implements MigrationInterface {
    name = 'ModifySomeTables1779621087159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04"`);
        await queryRunner.query(`ALTER TABLE "enrollment" RENAME COLUMN "courseId" TO "course_id"`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_dd1ce01d1164c8bbdda052ced74" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_dd1ce01d1164c8bbdda052ced74"`);
        await queryRunner.query(`ALTER TABLE "enrollment" RENAME COLUMN "course_id" TO "courseId"`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
