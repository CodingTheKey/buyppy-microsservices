import { Context } from "hono";
import { CategoryRepository } from "../../../application/repositories/category/prisma/prisma-category.repository";
import { FetchAllCategoriesUseCase } from "../../../application/use-case/category/fetch/fetch-all-categories.usecase";

export class FetchAllCategoriesController {
  static async execute(c: Context) {
    const usecase = new FetchAllCategoriesUseCase(new CategoryRepository())

    const categories = await usecase.execute()

    return c.newResponse(JSON.stringify({ data: categories }), 200)
  }
}