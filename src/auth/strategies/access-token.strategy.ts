import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSecretKey, JwtStrategy } from '@auth/utils/constants';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '@auth/types/token.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JwtStrategy.AccessToken) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JwtSecretKey.AccessToken),
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}
