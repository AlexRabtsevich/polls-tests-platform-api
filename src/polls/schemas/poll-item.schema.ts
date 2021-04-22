import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PollItemAnswer, PollItemAnswerSchema } from './poll-item-answer.shema';

@Schema({ versionKey: false })
export class PollItem extends Document {
  @Prop({ type: String, required: false, default: null })
  image: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [PollItemAnswerSchema], required: true })
  answers: [PollItemAnswer];

  @Prop({ type: String, required: false, default: null })
  rightAnswer: string | undefined;
}

export type PollItemDocument = PollItem & Document;

export const PollItemSchema = SchemaFactory.createForClass(PollItem);
