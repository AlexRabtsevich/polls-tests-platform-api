import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Poll, PollDocument } from './schemas/poll.schema';
import { CreatePollDto } from './dto/create-poll.dto';
import { API_ERROR, BadRequestException } from '../http-exceptions/bad-request-exception';
import { IItemsList, ISearchFilters } from './types/poll.type';
import { FilterQueryService } from './filter-query.service';
import { User } from '@users/schemas/users.schema';

@Injectable()
export class PollsService {
  constructor(
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>,
    private readonly filterQueryService: FilterQueryService,
  ) {}

  async create(createPoll: CreatePollDto, userId: string): Promise<Poll> {
    const newPoll = new this.pollModel({ ...createPoll, creator: userId });

    return newPoll.save();
  }

  async findMany(searchFilters: ISearchFilters): Promise<IItemsList> {
    const { types, toDate, query, fromDate, itemsPerPage, page } = searchFilters;

    const filterQuery: FilterQuery<PollDocument>[] = [
      {
        $or: this.filterQueryService.getQueryFilter(query),
      },
    ];

    if (types) {
      filterQuery.push({ $or: this.filterQueryService.getTypeFilter(types) });
    }

    const dateQuery = this.filterQueryService.getDateRangeFilters(fromDate, toDate);

    if (dateQuery) {
      filterQuery.push({ $or: [{ creationDate: dateQuery }] });
    }

    return await this.pollModel
      .find(
        {
          $and: filterQuery,
        },
        ['-items', '-feedback'],
      )
      .limit(itemsPerPage)
      .skip(itemsPerPage * page)
      .sort('creationDate')

      .exec()
      .then(async (polls) => {
        return {
          items: polls,
          totalItems: await this.pollModel.countDocuments({
            $and: filterQuery,
          }),
          currentPage: page,
          itemsPerPage,
        };
      });
  }

  async findOne(id: string): Promise<Poll> {
    const poll = this.pollModel
      .findOne({ _id: id })
      .populate({ path: 'creator', model: User.name, select: 'email firstName lastName' });

    if (!poll) {
      throw new HttpException('This poll is not found', HttpStatus.NOT_FOUND);
    }

    return poll;
  }

  async remove(pollId: string, userId: string): Promise<Poll | void> {
    const foundedPoll = await this.pollModel.findById(pollId);

    if (!foundedPoll) {
      throw new BadRequestException(API_ERROR, 'Poll is not found');
    }

    if (foundedPoll.creator !== userId) {
      throw new HttpException('You do not have permissions', HttpStatus.UNAUTHORIZED);
    }

    return foundedPoll.remove();
  }
}
