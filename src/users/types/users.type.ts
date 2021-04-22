import { UserDocument } from '@users/schemas/users.schema';

export type UserData = Omit<UserDocument, 'password'>;

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
