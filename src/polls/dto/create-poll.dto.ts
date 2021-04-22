import { IsNotEmpty, ValidateNested, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { IPoll, IItem, PollType } from '../types/poll.type';
import { CreateItemDto } from './create-poll-item.dto';

export class CreatePollDto implements IPoll {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly mainImage: string | undefined;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  readonly items: IItem[];

  readonly feedback: string | null;

  @IsNotEmpty()
  @IsString()
  readonly type: PollType;

  readonly hashtagList: string[] | undefined;
}
