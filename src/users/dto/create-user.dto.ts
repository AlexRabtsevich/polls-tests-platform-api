import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

import { IsEqual } from '../validation/is-equal.decorator';
import { ICreateUser } from '../types/users.type';
import { IsEmailExist } from '../validation/is-email-exist.decorator';

export class CreateUserDto implements ICreateUser {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly firstName;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly lastName;

  @IsEmail()
  @IsNotEmpty()
  @IsEmailExist()
  readonly email;

  @IsNotEmpty()
  @MinLength(5)
  readonly password;

  @IsNotEmpty()
  @IsEqual('password')
  readonly confirmPassword;
}
