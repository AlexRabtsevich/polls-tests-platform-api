import { IItemsAnswer, IItem } from '../types/poll.type';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnswerDto } from './create-poll-item-answer.dto';

export class CreateItemDto implements IItem {
  readonly image: string | undefined;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateAnswerDto)
  readonly answers: IItemsAnswer[];

  rightAnswer: string | null;
}
