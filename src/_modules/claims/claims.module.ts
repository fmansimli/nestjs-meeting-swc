import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ClaimsService } from "./claims.service";
import { ClaimsController } from "./claims.controller";
import { Claim } from "./entities/claim.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Claim])],
  controllers: [ClaimsController],
  providers: [ClaimsService]
})
export class ClaimsModule {}
