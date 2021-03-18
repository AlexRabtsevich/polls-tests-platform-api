import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from '@auth/strategies/access-token.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '@auth/../refresh-token/schemas/refresh-token.schema';
import { TokenService } from '@auth/token.service';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from '@refresh-token/refresh-token.module';
import { AuthController } from '@auth/auth.controller';
import { RefreshTokenStrategy } from '@auth/strategies/refresh-token.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    PassportModule,
    JwtModule.register({}),
    ConfigModule.forRoot(),
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, TokenService],
  exports: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
