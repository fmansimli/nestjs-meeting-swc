import { MigrationInterface, QueryRunner } from "typeorm";

export class ConveertinToNullable1733404223687 implements MigrationInterface {
    name = 'ConveertinToNullable1733404223687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "firstName" varchar(50) NOT NULL,
                "lastName" varchar(50) NOT NULL,
                "email" varchar(50) NOT NULL,
                "emailConfirmed" boolean NOT NULL,
                "phoneNumber" varchar(50) NOT NULL,
                "avatar" varchar,
                "refTokenId" varchar(50),
                "professionId" integer NOT NULL,
                CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "firstName",
                    "lastName",
                    "email",
                    "emailConfirmed",
                    "phoneNumber",
                    "avatar",
                    "refTokenId",
                    "professionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "firstName",
                "lastName",
                "email",
                "emailConfirmed",
                "phoneNumber",
                "avatar",
                "refTokenId",
                "professionId"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "firstName" varchar(50) NOT NULL,
                "lastName" varchar(50) NOT NULL,
                "email" varchar(50) NOT NULL,
                "emailConfirmed" boolean NOT NULL DEFAULT (0),
                "phoneNumber" varchar(50),
                "avatar" varchar,
                "refTokenId" varchar(50),
                "professionId" integer NOT NULL,
                CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "firstName",
                    "lastName",
                    "email",
                    "emailConfirmed",
                    "phoneNumber",
                    "avatar",
                    "refTokenId",
                    "professionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "firstName",
                "lastName",
                "email",
                "emailConfirmed",
                "phoneNumber",
                "avatar",
                "refTokenId",
                "professionId"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "firstName" varchar(50) NOT NULL,
                "lastName" varchar(50) NOT NULL,
                "email" varchar(50) NOT NULL,
                "emailConfirmed" boolean NOT NULL,
                "phoneNumber" varchar(50) NOT NULL,
                "avatar" varchar,
                "refTokenId" varchar(50),
                "professionId" integer NOT NULL,
                CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "firstName",
                    "lastName",
                    "email",
                    "emailConfirmed",
                    "phoneNumber",
                    "avatar",
                    "refTokenId",
                    "professionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "firstName",
                "lastName",
                "email",
                "emailConfirmed",
                "phoneNumber",
                "avatar",
                "refTokenId",
                "professionId"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "firstName" varchar(50) NOT NULL,
                "lastName" varchar(50) NOT NULL,
                "email" varchar(50) NOT NULL,
                "emailConfirmed" boolean NOT NULL,
                "phoneNumber" varchar(50) NOT NULL,
                "avatar" varchar,
                "refTokenId" varchar(50),
                "professionId" integer NOT NULL,
                CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "firstName",
                    "lastName",
                    "email",
                    "emailConfirmed",
                    "phoneNumber",
                    "avatar",
                    "refTokenId",
                    "professionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "firstName",
                "lastName",
                "email",
                "emailConfirmed",
                "phoneNumber",
                "avatar",
                "refTokenId",
                "professionId"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }

}
