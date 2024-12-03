import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./ormconfig";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MeetingsModule } from "./_modules/meetings/meetings.module";
import { UsersModule } from "./_modules/users/users.module";
import { PaymentsModule } from "./_modules/payments/payments.module";
import { ProfessionsModule } from './_modules/professions/professions.module';
import { SkillsModule } from './_modules/skills/skills.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), MeetingsModule, UsersModule, PaymentsModule, ProfessionsModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
