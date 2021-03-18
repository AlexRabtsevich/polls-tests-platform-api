import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '@auth/utils/constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(JwtStrategy.RefreshToken) {}
