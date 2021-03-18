import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class RefreshToken {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true, unique: true })
  userId: string;

  @Prop({ type: Number, required: true })
  refreshTokenExpires: number;
}

export type RefreshTokenDocument = RefreshToken & Document;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
