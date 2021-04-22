import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

import { CreateItemAnswerDto } from './create-item-answer.dto';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  pollId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemAnswerDto)
  answers: CreateItemAnswerDto[];
}
