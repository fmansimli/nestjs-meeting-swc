import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1733399418447 implements MigrationInterface {
    name = 'FirstMigration1733399418447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "hash" varchar NOT NULL,
                "status" varchar(20) NOT NULL,
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "skill" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "name" varchar(50) NOT NULL,
                "description" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "score" integer NOT NULL,
                "comment" varchar NOT NULL,
                PRIMARY KEY ("userId", "meetingId")
            )
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
            CREATE TABLE "profession" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "claim" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "name" varchar(70) NOT NULL,
                "alias" varchar(10) NOT NULL,
                "description" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "name" varchar NOT NULL,
                "description" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "sectionId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio_section" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "portfolioId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "REL_9d041c43c782a9135df1388ae1" UNIQUE ("userId")
            )
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
                "professionId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "token" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "token" varchar NOT NULL,
                PRIMARY KEY ("userId", "meetingId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "skill_users_user" (
                "skillId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("skillId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_73ae68f12aa554c4b071343d4e" ON "skill_users_user" ("skillId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_786399545fe25f4624c3084fba" ON "skill_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE TABLE "skill_meetings_meeting" (
                "skillId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                PRIMARY KEY ("skillId", "meetingId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9" ON "skill_meetings_meeting" ("skillId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52677f752f1bc6d2e803281cdb" ON "skill_meetings_meeting" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting_hosts_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3a3ee46b3ec62894f353ea2ba6" ON "meeting_hosts_user" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f88027799f95566990b4786b67" ON "meeting_hosts_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting_users_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a42373728a0ec6347ac8e6d21f" ON "meeting_users_user" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd" ON "meeting_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE TABLE "role_users_user" (
                "roleId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("roleId", "userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE TABLE "role_claims_claim" (
                "roleId" integer NOT NULL,
                "claimId" integer NOT NULL,
                PRIMARY KEY ("roleId", "claimId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9a573d736fbae5158911876c15" ON "role_claims_claim" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f4ab3216a1ca884c46707cdda5" ON "role_claims_claim" ("claimId")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_payment" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "hash" varchar NOT NULL,
                "status" varchar(20) NOT NULL,
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_7d1b40f3d7fa423a9372703c91e" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_payment"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "hash",
                    "status",
                    "meetingId",
                    "userId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "hash",
                "status",
                "meetingId",
                "userId"
            FROM "payment"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_payment"
                RENAME TO "payment"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_rating" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "score" integer NOT NULL,
                "comment" varchar NOT NULL,
                CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_d6809532088d1cf894726dfff94" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("userId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_rating"("userId", "meetingId", "score", "comment")
            SELECT "userId",
                "meetingId",
                "score",
                "comment"
            FROM "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_rating"
                RENAME TO "rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_portfolio_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "sectionId" integer NOT NULL,
                CONSTRAINT "FK_e9f11d0c0932fc2b378b33a91c2" FOREIGN KEY ("sectionId") REFERENCES "portfolio_section" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_portfolio_item"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "sectionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "sectionId"
            FROM "portfolio_item"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_portfolio_item"
                RENAME TO "portfolio_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_portfolio_section" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "portfolioId" integer NOT NULL,
                CONSTRAINT "FK_5886a3c8ea6f0106f27c35a7afb" FOREIGN KEY ("portfolioId") REFERENCES "portfolio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_portfolio_section"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "portfolioId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "portfolioId"
            FROM "portfolio_section"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio_section"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_portfolio_section"
                RENAME TO "portfolio_section"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_portfolio" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "REL_9d041c43c782a9135df1388ae1" UNIQUE ("userId"),
                CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_portfolio"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "userId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "userId"
            FROM "portfolio"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_portfolio"
                RENAME TO "portfolio"
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
            CREATE TABLE "temporary_token" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "token" varchar NOT NULL,
                CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_c33905707659f7d10eacebe46a6" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("userId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_token"("userId", "meetingId", "token")
            SELECT "userId",
                "meetingId",
                "token"
            FROM "token"
        `);
        await queryRunner.query(`
            DROP TABLE "token"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_token"
                RENAME TO "token"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_73ae68f12aa554c4b071343d4e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_786399545fe25f4624c3084fba"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_skill_users_user" (
                "skillId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_73ae68f12aa554c4b071343d4eb" FOREIGN KEY ("skillId") REFERENCES "skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_786399545fe25f4624c3084fbab" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("skillId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_skill_users_user"("skillId", "userId")
            SELECT "skillId",
                "userId"
            FROM "skill_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "skill_users_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_skill_users_user"
                RENAME TO "skill_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_73ae68f12aa554c4b071343d4e" ON "skill_users_user" ("skillId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_786399545fe25f4624c3084fba" ON "skill_users_user" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_52677f752f1bc6d2e803281cdb"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_skill_meetings_meeting" (
                "skillId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                CONSTRAINT "FK_4cfed7e8dd055ab3a3d7f85cf96" FOREIGN KEY ("skillId") REFERENCES "skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_52677f752f1bc6d2e803281cdbb" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("skillId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_skill_meetings_meeting"("skillId", "meetingId")
            SELECT "skillId",
                "meetingId"
            FROM "skill_meetings_meeting"
        `);
        await queryRunner.query(`
            DROP TABLE "skill_meetings_meeting"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_skill_meetings_meeting"
                RENAME TO "skill_meetings_meeting"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9" ON "skill_meetings_meeting" ("skillId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52677f752f1bc6d2e803281cdb" ON "skill_meetings_meeting" ("meetingId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3a3ee46b3ec62894f353ea2ba6"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f88027799f95566990b4786b67"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_meeting_hosts_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_3a3ee46b3ec62894f353ea2ba68" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_f88027799f95566990b4786b678" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_meeting_hosts_user"("meetingId", "userId")
            SELECT "meetingId",
                "userId"
            FROM "meeting_hosts_user"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting_hosts_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_meeting_hosts_user"
                RENAME TO "meeting_hosts_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3a3ee46b3ec62894f353ea2ba6" ON "meeting_hosts_user" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f88027799f95566990b4786b67" ON "meeting_hosts_user" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a42373728a0ec6347ac8e6d21f"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_meeting_users_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_a42373728a0ec6347ac8e6d21fb" FOREIGN KEY ("meetingId") REFERENCES "meeting" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_c77f72e10d4fe5fa6d5b188fddb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_meeting_users_user"("meetingId", "userId")
            SELECT "meetingId",
                "userId"
            FROM "meeting_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting_users_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_meeting_users_user"
                RENAME TO "meeting_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a42373728a0ec6347ac8e6d21f" ON "meeting_users_user" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd" ON "meeting_users_user" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_ed6edac7184b013d4bd58d60e5"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a88fcb405b56bf2e2646e9d479"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_role_users_user" (
                "roleId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("roleId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_role_users_user"("roleId", "userId")
            SELECT "roleId",
                "userId"
            FROM "role_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "role_users_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_role_users_user"
                RENAME TO "role_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9a573d736fbae5158911876c15"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f4ab3216a1ca884c46707cdda5"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_role_claims_claim" (
                "roleId" integer NOT NULL,
                "claimId" integer NOT NULL,
                CONSTRAINT "FK_9a573d736fbae5158911876c15b" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_f4ab3216a1ca884c46707cdda52" FOREIGN KEY ("claimId") REFERENCES "claim" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("roleId", "claimId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_role_claims_claim"("roleId", "claimId")
            SELECT "roleId",
                "claimId"
            FROM "role_claims_claim"
        `);
        await queryRunner.query(`
            DROP TABLE "role_claims_claim"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_role_claims_claim"
                RENAME TO "role_claims_claim"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9a573d736fbae5158911876c15" ON "role_claims_claim" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f4ab3216a1ca884c46707cdda5" ON "role_claims_claim" ("claimId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_f4ab3216a1ca884c46707cdda5"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9a573d736fbae5158911876c15"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_claims_claim"
                RENAME TO "temporary_role_claims_claim"
        `);
        await queryRunner.query(`
            CREATE TABLE "role_claims_claim" (
                "roleId" integer NOT NULL,
                "claimId" integer NOT NULL,
                PRIMARY KEY ("roleId", "claimId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "role_claims_claim"("roleId", "claimId")
            SELECT "roleId",
                "claimId"
            FROM "temporary_role_claims_claim"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_role_claims_claim"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f4ab3216a1ca884c46707cdda5" ON "role_claims_claim" ("claimId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9a573d736fbae5158911876c15" ON "role_claims_claim" ("roleId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a88fcb405b56bf2e2646e9d479"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_ed6edac7184b013d4bd58d60e5"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_users_user"
                RENAME TO "temporary_role_users_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "role_users_user" (
                "roleId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("roleId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "role_users_user"("roleId", "userId")
            SELECT "roleId",
                "userId"
            FROM "temporary_role_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_role_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a42373728a0ec6347ac8e6d21f"
        `);
        await queryRunner.query(`
            ALTER TABLE "meeting_users_user"
                RENAME TO "temporary_meeting_users_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting_users_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "meeting_users_user"("meetingId", "userId")
            SELECT "meetingId",
                "userId"
            FROM "temporary_meeting_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_meeting_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd" ON "meeting_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a42373728a0ec6347ac8e6d21f" ON "meeting_users_user" ("meetingId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f88027799f95566990b4786b67"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3a3ee46b3ec62894f353ea2ba6"
        `);
        await queryRunner.query(`
            ALTER TABLE "meeting_hosts_user"
                RENAME TO "temporary_meeting_hosts_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting_hosts_user" (
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("meetingId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "meeting_hosts_user"("meetingId", "userId")
            SELECT "meetingId",
                "userId"
            FROM "temporary_meeting_hosts_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_meeting_hosts_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f88027799f95566990b4786b67" ON "meeting_hosts_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3a3ee46b3ec62894f353ea2ba6" ON "meeting_hosts_user" ("meetingId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_52677f752f1bc6d2e803281cdb"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9"
        `);
        await queryRunner.query(`
            ALTER TABLE "skill_meetings_meeting"
                RENAME TO "temporary_skill_meetings_meeting"
        `);
        await queryRunner.query(`
            CREATE TABLE "skill_meetings_meeting" (
                "skillId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                PRIMARY KEY ("skillId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "skill_meetings_meeting"("skillId", "meetingId")
            SELECT "skillId",
                "meetingId"
            FROM "temporary_skill_meetings_meeting"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_skill_meetings_meeting"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52677f752f1bc6d2e803281cdb" ON "skill_meetings_meeting" ("meetingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9" ON "skill_meetings_meeting" ("skillId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_786399545fe25f4624c3084fba"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_73ae68f12aa554c4b071343d4e"
        `);
        await queryRunner.query(`
            ALTER TABLE "skill_users_user"
                RENAME TO "temporary_skill_users_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "skill_users_user" (
                "skillId" integer NOT NULL,
                "userId" integer NOT NULL,
                PRIMARY KEY ("skillId", "userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "skill_users_user"("skillId", "userId")
            SELECT "skillId",
                "userId"
            FROM "temporary_skill_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_skill_users_user"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_786399545fe25f4624c3084fba" ON "skill_users_user" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_73ae68f12aa554c4b071343d4e" ON "skill_users_user" ("skillId")
        `);
        await queryRunner.query(`
            ALTER TABLE "token"
                RENAME TO "temporary_token"
        `);
        await queryRunner.query(`
            CREATE TABLE "token" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "token" varchar NOT NULL,
                PRIMARY KEY ("userId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "token"("userId", "meetingId", "token")
            SELECT "userId",
                "meetingId",
                "token"
            FROM "temporary_token"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_token"
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
                "professionId" integer NOT NULL
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
            ALTER TABLE "portfolio"
                RENAME TO "temporary_portfolio"
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "REL_9d041c43c782a9135df1388ae1" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "portfolio"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "userId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "userId"
            FROM "temporary_portfolio"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_portfolio"
        `);
        await queryRunner.query(`
            ALTER TABLE "portfolio_section"
                RENAME TO "temporary_portfolio_section"
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio_section" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "portfolioId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "portfolio_section"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "portfolioId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "portfolioId"
            FROM "temporary_portfolio_section"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_portfolio_section"
        `);
        await queryRunner.query(`
            ALTER TABLE "portfolio_item"
                RENAME TO "temporary_portfolio_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "portfolio_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "visibility" boolean NOT NULL,
                "sectionId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "portfolio_item"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "title",
                    "description",
                    "visibility",
                    "sectionId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "title",
                "description",
                "visibility",
                "sectionId"
            FROM "temporary_portfolio_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_portfolio_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
                RENAME TO "temporary_rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "userId" integer NOT NULL,
                "meetingId" integer NOT NULL,
                "score" integer NOT NULL,
                "comment" varchar NOT NULL,
                PRIMARY KEY ("userId", "meetingId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "rating"("userId", "meetingId", "score", "comment")
            SELECT "userId",
                "meetingId",
                "score",
                "comment"
            FROM "temporary_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment"
                RENAME TO "temporary_payment"
        `);
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "deletedAt" datetime,
                "hash" varchar NOT NULL,
                "status" varchar(20) NOT NULL,
                "meetingId" integer NOT NULL,
                "userId" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "payment"(
                    "id",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "hash",
                    "status",
                    "meetingId",
                    "userId"
                )
            SELECT "id",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "hash",
                "status",
                "meetingId",
                "userId"
            FROM "temporary_payment"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_payment"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f4ab3216a1ca884c46707cdda5"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9a573d736fbae5158911876c15"
        `);
        await queryRunner.query(`
            DROP TABLE "role_claims_claim"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a88fcb405b56bf2e2646e9d479"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_ed6edac7184b013d4bd58d60e5"
        `);
        await queryRunner.query(`
            DROP TABLE "role_users_user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c77f72e10d4fe5fa6d5b188fdd"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a42373728a0ec6347ac8e6d21f"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting_users_user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f88027799f95566990b4786b67"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_3a3ee46b3ec62894f353ea2ba6"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting_hosts_user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_52677f752f1bc6d2e803281cdb"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_4cfed7e8dd055ab3a3d7f85cf9"
        `);
        await queryRunner.query(`
            DROP TABLE "skill_meetings_meeting"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_786399545fe25f4624c3084fba"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_73ae68f12aa554c4b071343d4e"
        `);
        await queryRunner.query(`
            DROP TABLE "skill_users_user"
        `);
        await queryRunner.query(`
            DROP TABLE "token"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio_section"
        `);
        await queryRunner.query(`
            DROP TABLE "portfolio_item"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TABLE "claim"
        `);
        await queryRunner.query(`
            DROP TABLE "profession"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "skill"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
    }

}
