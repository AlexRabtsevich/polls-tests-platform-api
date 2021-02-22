import { ICreateUser } from '../types/users.type';

export class CreateUserDto implements ICreateUser {
  readonly firstName;
  readonly lastName;
  readonly email;
  readonly password;
  readonly confirmPassword;
}