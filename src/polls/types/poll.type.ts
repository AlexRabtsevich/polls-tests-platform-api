import { PollDocument } from '../schemas/poll.schema';
import { IPagination } from '../../common/typings';
import { User } from '@users/schemas/users.schema';

export interface IPoll {
  description: string;
  mainImage: string | undefined;
  title: string;
  items: IItem[];
}

export interface IItem {
  image: string | undefined;
  title: string;
  answers: IItemsAnswer[];
}

export interface IItemsAnswer {
  variant: string;
  uuid: string;
}

export interface IItemsList extends IPagination {
  items: Omit<PollDocument, 'items' | '__v' | 'feedback'>[];
}

export interface ISearchFilters {
  fromDate?: string;
  toDate?: string;
  query?: string;
  types?: string[];
  page: number;
  itemsPerPage: number;
}

export enum PollType {
  Poll = 'poll',
  Test = 'test',
}

export enum FeedbackKey {
  A = 100,
  B = 75,
  C = 50,
  D = 25,
  Default = 0,
}

export type Feedback = Record<FeedbackKey, string>;
