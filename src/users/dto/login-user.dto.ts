import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ILoginUser } from '../types/users.type';

export class LoginUserDto implements ILoginUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
