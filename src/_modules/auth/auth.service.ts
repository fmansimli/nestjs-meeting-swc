import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";

import { jwtConstants } from "./constants/constants";
import { UsersService } from "../users/users.service";
import { Password } from "../../utils/password";

import type { SignUpDto } from "./dto/signup.dto";
import type { SignInDto } from "./dto/signin.dto";
import type { UserPayload } from "../../types";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(attrs: SignInDto) {
    const user = await this.usersService.findByEmail(attrs.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const result = await Password.compare(attrs.password, user.password);

    if (!result) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const tid = randomBytes(jwtConstants.idByteSize).toString("hex");

    user.refTokenId = tid;
    await this.usersService.save(user);

    const { id, email, password, refTokenId, roles, ...rest } = user;

    let claims = roles.flatMap((role) => role.claims.map((c) => c.alias));
    claims = Array.from(new Set(claims));

    const payload = { id, email, tid, claims };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: "6h" });

    return {
      user: { id, email, ...rest },
      auth: {
        accessToken,
        refreshToken
      }
    };
  }

  async signUp(attrs: SignUpDto) {
    const exists = await this.usersService.existsByEmail(attrs.email);

    if (exists) {
      throw new UnauthorizedException("email already exists");
    }

    const tid = randomBytes(jwtConstants.idByteSize).toString("hex");
    const user = await this.usersService.register({ ...attrs, refTokenId: tid });

    const { id, email, password, refTokenId, ...rest } = user;
    const payload = { id, email, tid, claims: [] };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: "6h" });

    return {
      user: { id, email, ...rest },
      auth: {
        accessToken,
        refreshToken
      }
    };
  }

  async refresh(attrs: UserPayload) {
    const { id, email, claims, tid } = attrs;

    const user = await this.usersService.findById(id);

    if (!user || user.refTokenId !== tid) {
      throw new UnauthorizedException("Invalid attempt");
    }
    const _tid = randomBytes(jwtConstants.idByteSize).toString("hex");
    const payload = { id, email, tid: _tid, claims };

    user.refTokenId = _tid;
    await this.usersService.save(user);

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: "6h" });

    return {
      auth: {
        accessToken,
        refreshToken
      }
    };
  }

  async getProfile(id: number) {
    return this.usersService.getUserProfile(id);
  }
}
