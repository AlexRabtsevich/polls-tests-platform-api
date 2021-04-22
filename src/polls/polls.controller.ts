import { Controller, Post, Body, UseGuards, Get, Delete, Param, Query } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { UserFromToken } from '@auth/decorators/user-from-token.decorator';

import { CreatePollDto } from './dto/create-poll.dto';
import { PollsService } from './polls.service';
import { ISearchFilters } from './types/poll.type';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollService: PollsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async createPoll(@Body() createPollDto: CreatePollDto, @UserFromToken('userId') userId: string) {
    return this.pollService.create(createPollDto, userId);
  }

  @Get()
  async getPollList(
    @Query('itemsPerPage') itemsPerPage: string,
    @Query('page') page: string,
    @Query('query') query: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
    @Query('types') types: string,
  ) {
    const filters: ISearchFilters = {
      itemsPerPage: +itemsPerPage,
      page: +page - 1,
      fromDate,
      query,
      toDate,
      types: types ? types.split(',') : undefined,
    };

    return this.pollService.findMany(filters);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async getPoll(@Param('id') id: string) {
    return this.pollService.findOne(id);
  }

  @Delete(':id/remove')
  @UseGuards(AccessTokenGuard)
  async removePoll(@Param('id') pollId: string, @UserFromToken('userId') userId: string) {
    return this.pollService.remove(pollId, userId);
  }
}
