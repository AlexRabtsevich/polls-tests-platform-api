import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { UserFromToken } from '@auth/decorators/user-from-token.decorator';

import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { PollsService } from '@polls/polls.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createAnswerDto: CreateAnswerDto, @UserFromToken('userId') userId: string) {
    return await this.answersService.create(createAnswerDto, userId);
  }
}
