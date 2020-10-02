import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TrashImage {
  @Field() readonly imgId: String;
  @Field() readonly img: String;
  @Field() readonly lat: String;
  @Field() readonly long: String;
  @Field() readonly time: String;
}