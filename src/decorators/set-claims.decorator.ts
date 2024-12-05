import { Reflector } from "@nestjs/core";

export const SetClaims = Reflector.createDecorator<string[]>();
