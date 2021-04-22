import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { PollItem, PollItemSchema } from './poll-item.schema';
import { PollType } from '../types/poll.type';

@Schema({ versionKey: false })
export class Poll extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false, default: null })
  mainImage: string;

  @Prop({ type: [PollItemSchema] })
  items: [PollItem];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true, unique: false })
  creator: string;

  @Prop({ type: Date, default: new Date() })
  creationDate: Date;

  @Prop({ type: String, required: false, default: null })
  feedback: string;

  @Prop({ type: PollType, required: true })
  type: PollType;

  @Prop({ type: [String], required: false, default: null })
  hashtagList: string[] | null;
}

export type PollDocument = Poll & Document;

export const PollSchema = SchemaFactory.createForClass(Poll);
