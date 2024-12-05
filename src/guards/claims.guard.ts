import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { SetClaims } from "../decorators/set-claims.decorator";
import type { UserPayload } from "../types";

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const claims = this.reflector.get(SetClaims, context.getHandler());

    if (!claims || claims.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    return claims.every((claim) => user.claims.includes(claim));
  }
}
