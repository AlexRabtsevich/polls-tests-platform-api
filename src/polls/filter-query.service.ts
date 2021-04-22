import { PollType } from './types/poll.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterQueryService {
  public getDateRangeFilters(fromDate: string | undefined, toDate: string | undefined) {
    let dateFilter = {};

    if (fromDate) {
      dateFilter = { ...dateFilter, $gte: new Date(fromDate) };
    }

    if (toDate) {
      dateFilter = { ...dateFilter, $lte: new Date(toDate) };
    }

    if (dateFilter.hasOwnProperty('$gte') || dateFilter.hasOwnProperty('$lte')) {
      return dateFilter;
    }
  }

  public getQueryFilter(query: string | undefined) {
    return [{ title: new RegExp(query, 'i') }, { hashtagList: new RegExp(query, 'i') }];
  }

  public getTypeFilter(types: string[] | undefined) {
    return [{ type: { $in: types as PollType[] } }];
  }
}
