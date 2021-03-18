import { Injectable } from '@nestjs/common';
import { ILoginUser } from '@users/types/users.type';
import { UsersService } from '@users/users.service';
import { TokenService } from '@auth/token.service';
import { RefreshTokenService } from '@refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private async createAccessAndRefreshToken(userId: string) {
    const { accessToken } = await this.tokenService.createAccessToken(userId);
    const { refreshToken } = await this.tokenService.createRefreshToken(userId);
    const refreshTokenExpires = this.tokenService.getTokenExpires(refreshToken);

    await this.refreshTokenService.createOrUpdateRefreshToken(userId, refreshTokenExpires);

    return { accessToken, refreshToken };
  }

  async login(loginUser: ILoginUser) {
    const user = await this.usersService.findByEmail(loginUser);

    return await this.createAccessAndRefreshToken(user._id);
  }

  async refresh(userId: string) {
    return await this.createAccessAndRefreshToken(userId);
  }
}
