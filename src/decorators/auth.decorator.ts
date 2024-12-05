import { UseGuards } from "@nestjs/common";

import { ClaimGuard } from "../guards/claims.guard";
import { RefreshGuard } from "../guards/refresh.guard";
import { JwtGuard } from "../guards/jwt.guard";

export function UseClaimsGuard() {
  return UseGuards(ClaimGuard);
}

export function UseJwtGuard() {
  return UseGuards(JwtGuard);
}

export function UseRefreshGuard() {
  return UseGuards(RefreshGuard);
}
