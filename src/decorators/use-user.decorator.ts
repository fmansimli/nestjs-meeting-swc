import { createParamDecorator } from "@nestjs/common";

export const UseUser = createParamDecorator((_data: never, ctx: any) => {
  const req = ctx.switchToHttp().getRequest();
  return req?.user || null;
});
