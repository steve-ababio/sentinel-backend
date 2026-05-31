import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTestTable1779935573063 implements MigrationInterface {
    name = 'AddTestTable1779935573063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "text" text NOT NULL, "options" jsonb NOT NULL DEFAULT '[]', "test_id" uuid NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08a6d4b0f49ff300bf3a0ca60a" ON "questions" ("id") `);
        await queryRunner.query(`CREATE TABLE "test_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "test_id" uuid NOT NULL, "score" double precision NOT NULL, "answers" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_e05ffc282586eb005bdbe62084b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e05ffc282586eb005bdbe62084" ON "test_submissions" ("id") `);
        await queryRunner.query(`CREATE TABLE "tests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "time_limit" integer NOT NULL DEFAULT '30', "allowed_attempts" integer NOT NULL DEFAULT '3', "module_id" uuid NOT NULL, CONSTRAINT "REL_8d21344ff33d0ceef2363eb8d7" UNIQUE ("module_id"), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4301ca51edf839623386860aed" ON "tests" ("id") `);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_b1f107600ed9ed81aba56edfcea" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_submissions" ADD CONSTRAINT "FK_c3072456d610b7077cb811a773a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_submissions" ADD CONSTRAINT "FK_983b7d564ea222e873cb9aeb88d" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_8d21344ff33d0ceef2363eb8d75" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_8d21344ff33d0ceef2363eb8d75"`);
        await queryRunner.query(`ALTER TABLE "test_submissions" DROP CONSTRAINT "FK_983b7d564ea222e873cb9aeb88d"`);
        await queryRunner.query(`ALTER TABLE "test_submissions" DROP CONSTRAINT "FK_c3072456d610b7077cb811a773a"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_b1f107600ed9ed81aba56edfcea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4301ca51edf839623386860aed"`);
        await queryRunner.query(`DROP TABLE "tests"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e05ffc282586eb005bdbe62084"`);
        await queryRunner.query(`DROP TABLE "test_submissions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08a6d4b0f49ff300bf3a0ca60a"`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}
