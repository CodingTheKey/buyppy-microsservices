import { v4 as uuid } from "uuid";
import { Category } from "../entity/category";

export class CategoryFactory {
  static create(
    title: string,
  ): Category {
    return new Category(
      uuid(),
      title,
    )
  }
}