import { Body, Controller, Post, HttpCode, HttpStatus, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { UseUser } from "../../decorators/use-user.decorator";
import { SetClaims } from "../../decorators/set-claims.decorator";
import { UseClaimsGuard, UseJwtGuard, UseRefreshGuard } from "../../decorators/auth.decorator";

import type { SignInDto } from "./dto/signin.dto";
import type { SignUpDto } from "./dto/signup.dto";
import type { UserPayload } from "../../types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post("signup")
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseRefreshGuard()
  @Get("refresh")
  async refreshAuth(@UseUser() user: UserPayload) {
    return this.authService.refresh(user);
  }

  @UseJwtGuard()
  @Get("profile")
  getProfile(@UseUser() user: UserPayload) {
    return this.authService.getProfile(user.id);
  }
}
