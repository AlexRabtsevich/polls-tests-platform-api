import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtExpiresIn, JwtSecretKey } from '@auth/utils/constants';
import { ITokenPayload } from '@auth/types/token.type';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async createAccessToken(userId: string) {
    const tokenData = { userId };

    return {
      accessToken: this.jwtService.sign(tokenData, {
        expiresIn: `${this.configService.get(JwtExpiresIn.AccessToken)}s`,
        secret: this.configService.get(JwtSecretKey.AccessToken),
      }),
    };
  }

  async createRefreshToken(userId: string) {
    const tokenData = { userId };

    return {
      refreshToken: this.jwtService.sign(tokenData, {
        expiresIn: `${this.configService.get(JwtExpiresIn.RefreshToken)}s`,
        secret: this.configService.get(JwtSecretKey.RefreshToken),
      }),
    };
  }

  getTokenExpires(token: string): number {
    const { exp } = this.jwtService.decode(token) as ITokenPayload;

    return exp;
  }
}
