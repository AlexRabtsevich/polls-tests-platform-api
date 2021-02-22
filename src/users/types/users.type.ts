export interface IUser{
  firstName:string;
  lastName:string;
  password: string;
  email:string;
}

export interface ICreateUser extends IUser{
  confirmPassword:string;
}