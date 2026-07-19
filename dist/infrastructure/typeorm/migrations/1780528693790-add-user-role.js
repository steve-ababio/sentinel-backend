"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserRole1780528693790 = void 0;
class AddUserRole1780528693790 {
    constructor() {
        this.name = 'AddUserRole1780528693790';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}
exports.AddUserRole1780528693790 = AddUserRole1780528693790;
