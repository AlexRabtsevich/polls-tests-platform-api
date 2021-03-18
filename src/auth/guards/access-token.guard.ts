import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@auth/utils/constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JwtStrategy.AccessToken) {}
