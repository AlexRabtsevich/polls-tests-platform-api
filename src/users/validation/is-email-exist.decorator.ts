import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailExistValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UsersService) {}

  async validate(email: string) {
    return !(await this.userService.isEmailExist(email));
  }

  defaultMessage(): string {
    return `User with $value email already exists`;
  }
}

export const IsEmailExist = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistValidator,
    });
  };
};
