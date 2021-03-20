import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtSecretKey, JwtStrategy } from '@auth/utils/constants';
import { RefreshTokenPayload } from '@auth/types/token.type';
import { RefreshTokenService } from '@refresh-token/refresh-token.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, JwtStrategy.RefreshToken) {
  constructor(
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField(JwtStrategy.RefreshToken),
      ignoreExpiration: false,
      secretOrKey: configService.get(JwtSecretKey.RefreshToken),
    });
  }

  async validate(payload: RefreshTokenPayload) {
    const { userId, exp } = payload;

    const isValidRefreshToken = await this.refreshTokenService.isValidRefreshToken(userId, exp);

    if (!isValidRefreshToken) {
      throw new HttpException('Refresh token is not valid', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
