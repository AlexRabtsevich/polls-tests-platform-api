import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RefreshTokenService } from './refresh-token.service';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }])],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
