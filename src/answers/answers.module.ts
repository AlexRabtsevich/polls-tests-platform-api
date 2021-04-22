import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { PollsModule } from '@polls/polls.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]), PollsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
