import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalStatusInMeeting1733423104362 implements MigrationInterface {
    name = 'OptionalStatusInMeeting1733423104362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_meeting" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "image" varchar,
                "scheduledAt" datetime NOT NULL,
                "isPaid" boolean NOT NULL DEFAULT (1),
                "status" varchar(20) NOT NULL DEFAULT ('CREATED')
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_meeting"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "image",
                    "scheduledAt",
                    "isPaid",
                    "status"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "image",
                "scheduledAt",
                "isPaid",
                "status"
            FROM "meeting"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_meeting"
                RENAME TO "meeting"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "meeting"
                RENAME TO "temporary_meeting"
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "image" varchar,
                "scheduledAt" datetime NOT NULL,
                "isPaid" boolean NOT NULL DEFAULT (1),
                "status" varchar(20) NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "meeting"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "image",
                    "scheduledAt",
                    "isPaid",
                    "status"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "image",
                "scheduledAt",
                "isPaid",
                "status"
            FROM "temporary_meeting"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_meeting"
        `);
    }

}
