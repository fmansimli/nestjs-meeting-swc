import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TokensService } from "./tokens.service";
import { TokensController } from "./tokens.controller";
import { Token } from "./entities/token.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokensController],
  providers: [TokensService]
})
export class TokensModule {}
