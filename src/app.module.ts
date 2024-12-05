import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "./ormconfig";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MeetingsModule } from "./_modules/meetings/meetings.module";
import { UsersModule } from "./_modules/users/users.module";
import { PaymentsModule } from "./_modules/payments/payments.module";
import { ProfessionsModule } from "./_modules/professions/professions.module";
import { SkillsModule } from "./_modules/skills/skills.module";
import { RatingsModule } from "./_modules/ratings/ratings.module";
import { TokensModule } from "./_modules/tokens/tokens.module";
import { RolesModule } from "./_modules/roles/roles.module";
import { ClaimsModule } from "./_modules/claims/claims.module";
import { PortfoliosModule } from './_modules/portfolios/portfolios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    MeetingsModule,
    UsersModule,
    PaymentsModule,
    ProfessionsModule,
    SkillsModule,
    RatingsModule,
    TokensModule,
    RolesModule,
    ClaimsModule,
    PortfoliosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
