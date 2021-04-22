import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemAnswerDto {
  @IsNotEmpty()
  @IsString()
  pollItemId: string;

  @IsNotEmpty()
  @IsString()
  pollAnswerUuid: string;
}
