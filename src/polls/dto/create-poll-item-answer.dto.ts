import { IItemsAnswer } from '../types/poll.type';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto implements IItemsAnswer {
  @IsNotEmpty()
  @IsString()
  readonly variant: string;

  @IsNotEmpty()
  @IsString()
  readonly uuid: string;
}
