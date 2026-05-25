import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySomeTables1779620292890 implements MigrationInterface {
    name = 'ModifySomeTables1779620292890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "course" ADD "instructor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "skillsGained" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "approvalRate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_deca5c9911b3b2100b361060826" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_deca5c9911b3b2100b361060826"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "approvalRate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "skillsGained" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "instructor_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "user_id"`);
    }

}
