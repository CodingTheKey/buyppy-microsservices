import { Category } from "../../../../domain/category/entity/category";
import { prisma } from "../../../../infra/db/prisma/primsa";
import { CategoryRepositoryInterface } from "../category-repository.interface";

export class CategoryRepository implements CategoryRepositoryInterface {
  async create(entity: Category): Promise<void | Category> {
    await prisma.category.create({
      data: {
        id: entity.id,
        title: entity.title
      }
    })
  }
  update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Category[]> {
    const model = await prisma.category.findMany()

    const categories = model.map((c) => new Category(c.id, c.title))

    return categories
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}