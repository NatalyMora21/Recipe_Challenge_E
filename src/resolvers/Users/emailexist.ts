import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { Users } from "../../entity/users";
  
  @ValidatorConstraint({ async: true })
  export class IsEmailAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    validate(email: string) {
      return Users.findOne({ where: { email } }).then(Users => {
        if (Users) return false;
        return true;
      });
    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint
      });
    };
  }