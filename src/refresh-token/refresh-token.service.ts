import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshToken, RefreshTokenDocument } from './schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenService {
  constructor(@InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshTokenDocument>) {}

  public async createOrUpdateRefreshToken(userId: string, refreshTokenExpires: number): Promise<RefreshTokenDocument> {
    const isExistRefreshToken = await this.refreshTokenModel.exists({ userId });

    if (isExistRefreshToken) {
      return await this.updateRefreshToken(userId, refreshTokenExpires);
    }

    return await this.createRefreshToken(userId, refreshTokenExpires);
  }

  private async createRefreshToken(userId, refreshTokenExpires: number): Promise<RefreshTokenDocument> {
    const refreshTokenModel = new this.refreshTokenModel({ userId, refreshTokenExpires });

    return await refreshTokenModel.save();
  }

  private async updateRefreshToken(userId: string, newRefreshTokenExpires: number): Promise<RefreshTokenDocument> {
    const refreshToken = await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshTokenExpires: newRefreshTokenExpires },
    );

    return await refreshToken.save();
  }

  async isValidRefreshToken(userId: string, refreshTokenExpires: number): Promise<boolean> {
    const refreshTokenModel = await this.refreshTokenModel.findOne({ userId });

    if (!refreshTokenModel) {
      throw new HttpException('Refresh token is not found', HttpStatus.UNAUTHORIZED);
    }

    if (refreshTokenExpires !== refreshTokenModel.refreshTokenExpires) {
      throw new HttpException('Refresh token is not valid', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  async removeRefreshToken(userId: string): Promise<void> {
    this.refreshTokenModel.findOneAndDelete({ userId });
  }
}
