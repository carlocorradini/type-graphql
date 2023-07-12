import { MinLength } from "class-validator";
import type { ClassType } from "type-graphql";
import { Field, InputType, ObjectType } from "type-graphql";

// Adds 'password' property with validation to the base, extended class
export function withPassword<TClassType extends ClassType>(BaseClass: TClassType) {
  @ObjectType()
  @InputType()
  class PasswordTrait extends BaseClass {
    @MinLength(8)
    @Field()
    password!: string;
  }

  return PasswordTrait;
}