import { Field, InputType } from "type-graphql";
import { PersonInput } from "../person/person.input";

@InputType()
export class StudentInput extends PersonInput {
  @Field()
  universityName!: string;
}
