"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modification1780949039159 = void 0;
class Modification1780949039159 {
    constructor() {
        this.name = 'Modification1780949039159';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "FK_71474e6f326e11b20f17802e46b"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "UQ_71474e6f326e11b20f17802e46b"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP COLUMN IF EXISTS "lesson_id"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "FK_8d21344ff33d0ceef2363eb8d75"`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "module_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_8d21344ff33d0ceef2363eb8d75" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "FK_8d21344ff33d0ceef2363eb8d75"`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "module_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_8d21344ff33d0ceef2363eb8d75" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD COLUMN IF NOT EXISTS "lesson_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "UQ_71474e6f326e11b20f17802e46b" UNIQUE ("lesson_id")`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_71474e6f326e11b20f17802e46b" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.Modification1780949039159 = Modification1780949039159;
