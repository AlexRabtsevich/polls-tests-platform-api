import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '@auth/types/token.type';

export const UserFromToken = createParamDecorator((propertyKey: keyof ITokenPayload, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return propertyKey ? request.user[propertyKey] : request.user;
});
