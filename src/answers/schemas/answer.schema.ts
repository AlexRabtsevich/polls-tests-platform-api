import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { CreateItemAnswerDto } from '../dto/create-item-answer.dto';
import { IPollResult } from '../types';

@Schema({ versionKey: false })
export class Answer extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Polls', required: true, unique: false })
  poll: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true, unique: false })
  creator: string;

  @Prop({ type: CreateItemAnswerDto, required: true })
  answers: CreateItemAnswerDto[];

  @Prop({ type: Date, default: new Date() })
  creationDate: Date;

  @Prop({ type: Object, required: true })
  pollResult: IPollResult;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
