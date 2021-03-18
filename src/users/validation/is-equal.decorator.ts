import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class IsEqualValidator<T> implements ValidatorConstraintInterface {
  validate(value: T, validationArguments: ValidationArguments) {
    if (value) {
      const [relatedPropertyName] = validationArguments.constraints;
      const relatedValue = (validationArguments.object as any)[relatedPropertyName];

      return value === relatedValue;
    }

    return false;
  }

  defaultMessage(): string {
    return `$property is not equal`;
  }
}

export const IsEqual = (property: string, validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsEqualValidator,
    });
  };
};
