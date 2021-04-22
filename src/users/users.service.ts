import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isCryptCompare } from '@users/utils';
import { ICreateUser, ILoginUser, UserData } from '@users/types/users.type';
import { User, UserDocument } from './schemas/users.schema';
import { BadRequestException } from '../http-exceptions/bad-request-exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUser: ICreateUser): Promise<UserData> {
    const newUser = new this.userModel(createUser);

    return newUser.save();
  }

  async findByEmail({ email, password }: ILoginUser): Promise<UserData> {
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new BadRequestException('email', 'User not found');
    }

    const isPasswordCompared = await isCryptCompare(password, user.password);

    if (!isPasswordCompared) {
      throw new BadRequestException('password', 'Invalid credentials');
    }

    return user.populate('user', '-password');
  }

  async findUserById(id: string): Promise<UserData> {
    return this.userModel.findById(id).select('-_id');
  }

  async findMyProfile(id: string): Promise<UserData> {
    return this.userModel.findById(id);
  }

  async isEmailExist(email: string): Promise<boolean> {
    return await this.userModel.exists({ email });
  }
}
