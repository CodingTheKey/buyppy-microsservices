import { Category } from "../../../../domain/category/entity/category";

export class CategoryMapper {
  static execute(entity: Category) {
    return {
      id: entity.id,
      title: entity.title
    }
  }
}