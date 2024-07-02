import { Model, Field } from '@drizzle-orm/core';

@Model()
export class Book {
  @Field({ primary: true })
  id!: number;

  @Field()
  title!: string;

  @Field()
  author!: string;

  @Field()
  publicationYear!: number;
}
