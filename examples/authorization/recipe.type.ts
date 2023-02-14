import { ObjectType, Field, Int, Authorized, Float } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Authorized() // Restrict access only for authenticated users
  @Field(_type => [String])
  ingredients: string[];

  @Authorized("ADMIN") // Restrict access only for 'ADMIN' users
  @Field(_type => [Int])
  ratings: number[];

  @Field(_type => Float, { nullable: true })
  get averageRating(): number | null {
    return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
}
