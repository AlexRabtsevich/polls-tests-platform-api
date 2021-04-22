import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IItemsAnswer } from '@polls/types/poll.type';

@Schema({ versionKey: false })
export class PollItemAnswer extends Document implements IItemsAnswer {
  @Prop({ type: String, required: true })
  readonly variant: string;

  @Prop({ type: String, required: true })
  readonly uuid: string;
}

export type PollItemAnswerDocument = PollItemAnswer & Document;

export const PollItemAnswerSchema = SchemaFactory.createForClass(PollItemAnswer);
