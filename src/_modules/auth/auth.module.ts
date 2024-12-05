import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { JwtRefreshStrategy } from "./strategies/refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants/constants";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtStrategy]
})
export class AuthModule {}
