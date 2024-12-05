import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

import type { Request } from "express";
import type { UserPayload } from "../../../types";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: UserPayload) {
    return payload;
  }
}
