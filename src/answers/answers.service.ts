import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Answer } from './schemas/answer.schema';
import { CreateAnswerDto } from '@answers/dto/create-answer.dto';
import { PollsService } from '@polls/polls.service';
import { IPollResult } from '@answers/types';
import { getResultScore } from '@answers/utils';
import { Poll } from '@polls/schemas/poll.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    private readonly pollService: PollsService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto, userId: string): Promise<Answer> {
    const poll = await this.pollService.findOne(createAnswerDto.pollId);

    const pollResult: IPollResult = {
      countQuestions: poll.items.length,
      score: getResultScore(createAnswerDto.answers, poll.items),
    };

    const createdAnswer = new this.answerModel({
      poll: createAnswerDto.pollId,
      answers: createAnswerDto.answers,
      creator: userId,
      pollResult,
    });

    return createdAnswer.save().then(() => {
      return this.answerModel.populate(createdAnswer, {
        path: 'poll',
        model: Poll.name,
        select: 'feedback type',
      });
    });
  }
}
